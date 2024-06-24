import React from 'react';

function Hotel({ hotel }) {
  // Function to render star rating
  const renderStars = (rate) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rate) {
        stars.push(
          <span key={i} className="text-yellow-500">
            &#9733;
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            &#9733;
          </span>
        );
      }
    }
    return stars;
  };

  // Parse the rating to a number
  const rating = parseFloat(hotel.rate);

  // Function to truncate long coupon text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 bg-white relative group">
      {hotel.flagship && (
        <div className="absolute top-1 left-2 bg-red-400 group-hover:bg-red-500 text-white py-2 px-3 rounded-tl-lg rounded-br-lg">
          Flagship
        </div>
      )}
      <div
        className="h-48 bg-cover bg-center rounded-t-lg"
        style={{ backgroundImage: `url(${hotel.img})` }}
      ></div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{hotel.name}</h3>
        <p className="text-gray-600 mb-1">{hotel.city}</p>
        <div className="flex items-center mb-2">
          {renderStars(rating)}
          <span className="ml-2 text-gray-600">({hotel.rate})</span>
        </div>
        {hotel.coupons && hotel.coupons.length > 0 && (
          <div className="mb-2">
            <h4 className="text-md font-semibold mb-1">Coupons:</h4>
            <ul className="list-disc list-inside">
              {hotel.coupons.map((coupon, index) => (
                <li key={index} className="text-gray-600">
                  {truncateText(coupon, 30)} {/* Limiting coupon text to 50 characters */}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button className="mt-2 py-1 px-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300">
          More Details
        </button>
      </div>
    </div>
  );
}

export default Hotel;
