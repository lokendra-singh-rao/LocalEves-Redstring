import React from "react";

const UserCard = ({ username, userEmail, registeredAt }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-2 bg-white">
      <div className="px-2 py-2">
        <div className="font-bold text-xl mb-2">{username}</div>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Email:</span> {userEmail}
        </p>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">Registered At:</span> {new Date(registeredAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
