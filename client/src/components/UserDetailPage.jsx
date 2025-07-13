import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useNavigate } from "react-router-dom";

const UserDetailPage = ({ userName, onUpdate }) => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(userName || "John Doe");
  const [email, setEmail] = useState(userName +"@gmail.com");
  const [password, setPassword] = useState("********");
  const [threshold, setThreshold] = useState(20);

  const handleSave = () => {
    setEditMode(false);
    onUpdate && onUpdate({ name, email, password });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-3xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
        <button
          onClick={() => navigate("/")}
          className="text-blue-500 hover:underline"
        >
          ← Back to Home
        </button>
      </div>

      <Tabs>
        <TabList>
          <Tab>Profile</Tab>
          <Tab>Privacy</Tab>
          <Tab>Notifications</Tab>
          <Tab>Discount</Tab>
          <Tab>Preferences</Tab>
        </TabList>

        <TabPanel>
          <div className="bg-white rounded-lg shadow p-6 mt-4">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src="https://i.pravatar.cc/100"
                alt="Avatar"
                className="w-24 h-24 rounded-full border"
              />
              <div className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-700">
                    Profile Information
                  </h2>
                  {!editMode && (
                    <button
                      onClick={() => setEditMode(true)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-600">Name</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium">{name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-600">Email</label>
                    {editMode ? (
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium">{email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-600">Password</label>
                    {editMode ? (
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium">{password}</p>
                    )}
                  </div>

                  {editMode && (
                    <div className="flex justify-end gap-4 pt-4">
                      <button
                        onClick={() => setEditMode(false)}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="bg-white rounded-lg shadow p-6 mt-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Privacy Settings</h2>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="bg-white rounded-lg shadow p-6 mt-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Notification Settings</h2>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="bg-white rounded-lg shadow p-6 mt-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Discount Threshold</h2>
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(parseInt(e.target.value))}
              className="border px-3 py-2 rounded w-24"
            />
            <p className="text-gray-500 text-sm mt-2">
              Set minimum discount percentage to highlight deals.
            </p>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="bg-white rounded-lg shadow p-6 mt-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Preferences</h2>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        </TabPanel>
      </Tabs>
    </motion.div>
  );
};

export default UserDetailPage;
