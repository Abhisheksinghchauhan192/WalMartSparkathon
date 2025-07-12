const express = require("express");
const router = express.Router();
const Cart = require("../database/models/Cart");
const Product = require("../database/models/Product");

// get cart route
router.get("/:id", async (req, res) => {
  // let's first find out the cart of the user
  const id = req.params.id;

  try {
    // Get the user's cart with product info populated
    const cart = await Cart.findOne({ userID: id }).populate(
      "products.productID"
    );

    if (!cart || cart.products.length === 0) {
      return res.status(200).json({
        cart: [],
        suggestions: [],
        message: "Cart is empty",
      });
    }

    // now task is to build the suggestions array based on the user's Cart items.

    // building the response that we have to return and the
    // suggestion items for current cart items.

    const userOriginalCartItems = [];
    const suggestions = [];

    for (const item of cart.products) {
      const original = item.productID;

      // Push full original item data to cart
      userOriginalCartItems.push({
        _id: original._id,
        name: original.name,
        price: original.price,
        quantity: item.quantity,
        imgUrl: original.imgUrl,
        description: original.description,
        carbonFootprint: original.product_carbon_footprint,
      });

      // Get 2 better alternatives
      const alternatives = await Product.find({
        product_category: original.product_category,
        _id: { $ne: original._id },
        product_carbon_footprint: { $lt: original.product_carbon_footprint },
      })
        .sort({ product_carbon_footprint: 1 })
        .limit(2);

      const productSuggestions = [];

      for (const suggested of alternatives) {
        const percentReduction = Math.round(
          ((original.product_carbon_footprint -
            suggested.product_carbon_footprint) /
            original.product_carbon_footprint) *
            100
        );

        productSuggestions.push({
          suggestedID: suggested._id,
          name: suggested.name,
          price: suggested.price,
          imgUrl: suggested.imgUrl,
          description: suggested.description,
          carbonFootprint: suggested.product_carbon_footprint,
          reason: `This emits ${percentReduction}% less CO₂ than ${original.name}`,
        });
      }

      if (productSuggestions.length > 0) {
        suggestions.push({
          forProduct: {
            _id: original._id,
            name: original.name,
            imgUrl: original.imgUrl,
          },
          suggestions: productSuggestions,
        });
      }
    }

    res.status(200).json({
      cart: userOriginalCartItems,
      suggestions,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error While Fetching the Cart Data" });
  }
});

// add to cart route

router.post("/add", async (req, res) => {
  let { userID, productID, quantity } = req.body;

  if (!quantity) quantity = 1;

  try {
    //  Find user's cart
    let cart = await Cart.findOne({ userID });

    //  If cart doesn't exist, create one
    if (!cart) {
      cart = new Cart({
        userID,
        products: [{ productID, quantity }],
      });
    } else {
      //  If cart exists, check if product is already in it
      const itemExists = cart.products.find(
        (item) => item.productID.toString() === productID
      );

      if (itemExists) {
        itemExists.quantity += quantity;
      } else {
        cart.products.push({ productID, quantity });
      }
    }

    // Save cart and send response
    await cart.save();
    return res.status(200).json({ message: "Item added to cart" });
  } catch (err) {
    console.error("Error while adding item to cart", err);
    return res.status(500).json({ message: "Error while adding item to cart" });
  }
});



// now settingup the swap route.

router.put("/swap", async (req, res) => {
  const { userID, originalProductID, suggestedProductID } = req.body;

  try {
    const cart = await Cart.findOne({ userID });

    // 1. Get quantity of original item
    const originalItem = cart.products.find(
      (item) => item.productID.toString() === originalProductID
    );
    const originalQuantity = originalItem.quantity;

    // 2. Remove original item from cart
    cart.products = cart.products.filter(
      (item) => item.productID.toString() !== originalProductID
    );

    // 3. Add/increment suggested product in cart
    const existingSuggested = cart.products.find(
      (item) => item.productID.toString() === suggestedProductID
    );

    if (existingSuggested) {
      existingSuggested.quantity += originalQuantity;
    } else {
      cart.products.push({ productID: suggestedProductID, quantity: originalQuantity });
    }

    // 4. Save updated cart
    await cart.save();

    // 5. Populate cart data
    const updatedCart = await Cart.findOne({ userID }).populate("products.productID");

    const userOriginalCartItems = [];
    const suggestions = [];

    for (const item of updatedCart.products) {
      const original = item.productID;

      userOriginalCartItems.push({
        _id: original._id,
        name: original.name,
        price: original.price,
        quantity: item.quantity,
        imgUrl: original.imgUrl,
        description: original.description,
        carbonFootprint: original.product_carbon_footprint,
      });

      const alternatives = await Product.find({
        product_category: original.product_category,
        _id: { $ne: original._id },
        product_carbon_footprint: { $lt: original.product_carbon_footprint },
      })
        .sort({ product_carbon_footprint: 1 })
        .limit(2);

      const productSuggestions = [];

      for (const suggested of alternatives) {
        const percentReduction = Math.round(
          ((original.product_carbon_footprint - suggested.product_carbon_footprint) /
            original.product_carbon_footprint) * 100
        );

        productSuggestions.push({
          suggestedID: suggested._id,
          name: suggested.name,
          price: suggested.price,
          imgUrl: suggested.imgUrl,
          description: suggested.description,
          carbonFootprint: suggested.product_carbon_footprint,
          reason: `This emits ${percentReduction}% less CO₂ than ${original.name}`,
        });
      }

      if (productSuggestions.length > 0) {
        suggestions.push({
          forProduct: {
            _id: original._id,
            name: original.name,
            imgUrl: original.imgUrl,
          },
          suggestions: productSuggestions,
        });
      }
    }

    // 6. Final Response
    res.status(200).json({
      message: "Swap successful",
      cart: userOriginalCartItems,
      suggestions,
    });

  } catch (err) {
    console.error("Swap error:", err);
    res.status(500).json({ message: "Error swapping product" });
  }
});


// Delete Route for the items in the cart
// In backend/routes/cartRoutes.js
router.delete('/remove', async (req, res) => {
  const { userID, productID } = req.body;

  try {
    const cart = await Cart.findOne({ userID });
    if (!cart) {
      return res.status(404).json({ message: 'cart empty' });
    }
    // Filter out the product to be removed
    cart.products = cart.products.filter(
      (item) => item.productID.toString() !== productID
    );

    await cart.save();

    // Repopulate updated cart
    const updatedCart = await Cart.findOne({ userID }).populate('products.productID');

    const userOriginalCartItems = [];
    const suggestions = [];

    for (const item of updatedCart.products) {
      const original = item.productID;

      userOriginalCartItems.push({
        _id: original._id,
        name: original.name,
        price: original.price,
        quantity: item.quantity,
        imgUrl: original.imgUrl,
        description: original.description,
        carbonFootprint: original.product_carbon_footprint,
      });

      const alternatives = await Product.find({
        product_category: original.product_category,
        _id: { $ne: original._id },
        product_carbon_footprint: { $lt: original.product_carbon_footprint },
      })
        .sort({ product_carbon_footprint: 1 })
        .limit(2);

      const productSuggestions = [];

      for (const suggested of alternatives) {
        const percentReduction = Math.round(
          ((original.product_carbon_footprint - suggested.product_carbon_footprint) /
            original.product_carbon_footprint) * 100
        );

        productSuggestions.push({
          suggestedID: suggested._id,
          name: suggested.name,
          price: suggested.price,
          imgUrl: suggested.imgUrl,
          description: suggested.description,
          carbonFootprint: suggested.product_carbon_footprint,
          reason: `This emits ${percentReduction}% less CO₂ than ${original.name}`,
        });
      }

      if (productSuggestions.length > 0) {
        suggestions.push({
          forProduct: {
            _id: original._id,
            name: original.name,
            imgUrl: original.imgUrl,
          },
          suggestions: productSuggestions,
        });
      }
    }

    res.status(200).json({
      message: 'Item removed successfully',
      cart: userOriginalCartItems,
      suggestions,
    });
  } catch (err) {
    console.error('Error removing product:', err);
    res.status(500).json({ message: 'Error while removing item from cart' });
  }
});


// routes for increase and decrease the items in the cart .

// helper shared function for increasing and decreasing. 
async function returnCartWithSuggestions(userID, res) {
  const cart = await Cart.findOne({ userID }).populate('products.productID');

  const userOriginalCartItems = [];
  const suggestions = [];

  for (const item of cart.products) {
    const original = item.productID;

    userOriginalCartItems.push({
      _id: original._id,
      name: original.name,
      price: original.price,
      quantity: item.quantity,
      imgUrl: original.imgUrl,
      description: original.description,
      carbonFootprint: original.product_carbon_footprint,
    });

    const alternatives = await Product.find({
      product_category: original.product_category,
      _id: { $ne: original._id },
      product_carbon_footprint: { $lt: original.product_carbon_footprint },
    })
      .sort({ product_carbon_footprint: 1 })
      .limit(2);

    const productSuggestions = [];

    for (const suggested of alternatives) {
      const percentReduction = Math.round(
        ((original.product_carbon_footprint - suggested.product_carbon_footprint) /
          original.product_carbon_footprint) * 100
      );

      productSuggestions.push({
        suggestedID: suggested._id,
        name: suggested.name,
        price: suggested.price,
        imgUrl: suggested.imgUrl,
        description: suggested.description,
        carbonFootprint: suggested.product_carbon_footprint,
        reason: `This emits ${percentReduction}% less CO₂ than ${original.name}`,
      });
    }

    if (productSuggestions.length > 0) {
      suggestions.push({
        forProduct: {
          _id: original._id,
          name: original.name,
          imgUrl: original.imgUrl,
        },
        suggestions: productSuggestions,
      });
    }
  }

  res.status(200).json({
    message: 'Cart updated successfully',
    cart: userOriginalCartItems,
    suggestions,
  });
}


// increse route

router.put('/increase', async (req, res) => {
  const { userID, productID } = req.body;

  try {
    const cart = await Cart.findOne({ userID });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.products.find(
      (p) => p.productID.toString() === productID
    );

    if (item) {
      item.quantity += 1;
      await cart.save();
    }

    return await returnCartWithSuggestions(cart.userID, res);

  } catch (err) {
    console.error('Increase error:', err);
    res.status(500).json({ message: 'Error increasing quantity' });
  }
});


// decrease route

router.put('/decrease', async (req, res) => {
  const { userID, productID } = req.body;

  try {
    const cart = await Cart.findOne({ userID });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.products.find(
      (p) => p.productID.toString() === productID
    );

    if (item) {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        cart.products = cart.products.filter(
          (p) => p.productID.toString() !== productID
        );
      }
      await cart.save();
    }

    return await returnCartWithSuggestions(cart.userID, res);

  } catch (err) {
    console.error('Decrease error:', err);
    res.status(500).json({ message: 'Error decreasing quantity' });
  }
});


module.exports = router;
