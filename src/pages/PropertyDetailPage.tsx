import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { usePropertyStore } from "@/store/propertyStore";
import { parseCurrency } from "@/lib/utils";

const GOOGLE_MAPS_LIBRARIES: "marker"[] = ["marker"];

const PropertyDetailPage = () => {
  const navigate = useNavigate();
  const { selectedProperty } = usePropertyStore();

  const additionalCosts = {
    downPayment: 10,
    propertyTax: 0.8,
    insurance: 1000,
    maintenance: 2000,
    inspection: 300,
    closing: 3000,
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY!,
    libraries: GOOGLE_MAPS_LIBRARIES,
    language: "en",
    region: "US",
  });

  const handleStartPurchase = () => {
    if (selectedProperty) {
      navigate(`/property-process/${selectedProperty.id}`);
    }
  };

  const calculateTotalCost = () => {
    if (!selectedProperty) return 0;

    const priceNumber = parseCurrency(selectedProperty.price);
    const downPaymentAmount = (priceNumber * additionalCosts.downPayment) / 100;
    const propertyTaxAmount = (priceNumber * additionalCosts.propertyTax) / 100;

    const totalCost =
      downPaymentAmount +
      propertyTaxAmount +
      additionalCosts.insurance +
      additionalCosts.maintenance +
      additionalCosts.inspection +
      additionalCosts.closing;

    return totalCost;
  };

  if (!isLoaded) return <div>Loading...</div>;
  if (!selectedProperty) return <div>Property not found</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Main Image Section */}
      <div className="h-[40vh]">
        <img
          src={`https://picsum.photos/seed/${selectedProperty.id}/1200/800`}
          alt={selectedProperty.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="w-full px-4">
        <div className="py-6">
          {/* Title and Basic Info */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {selectedProperty.title}
            </h1>
            <p className="text-gray-600">{selectedProperty.address}</p>
          </div>

          {/* Detailed Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Map and Details */}
            <div>
              {/* Google Map */}
              <div className="h-[400px] mb-6">
                <GoogleMap
                  mapContainerStyle={{ height: "100%", width: "100%" }}
                  zoom={15}
                  center={{
                    lat: selectedProperty.position.lat,
                    lng: selectedProperty.position.lng,
                  }}
                  options={{
                    mapId: "b7b796cbc9406757",
                    zoomControl: true,
                    mapTypeControl: false,
                    streetViewControl: true,
                    fullscreenControl: true,
                  }}
                />
              </div>

              {/* Property Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Property Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50">
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold">{selectedProperty.address}</p>
                  </div>
                  <div className="p-4 bg-gray-50">
                    <p className="text-sm text-gray-600">Region Code</p>
                    <p className="font-semibold">{selectedProperty.state}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Cost Calculator and Purchase Button */}
            <div className="bg-gray-50 p-6">
              <h2 className="text-2xl font-bold mb-6">Cost Calculation</h2>

              {/* Base Price */}
              <div className="mb-6">
                <p className="text-gray-600">Sale Price</p>
                <p className="text-3xl font-bold text-blue-600">
                  {selectedProperty.price.toLocaleString()}
                </p>
              </div>

              {/* Additional Costs */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Down Payment ({additionalCosts.downPayment}%)</span>
                  <span>
                    $
                    {(
                      (parseCurrency(selectedProperty.price) *
                        additionalCosts.downPayment) /
                      100
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>
                    Property Tax (Annual {additionalCosts.propertyTax}%)
                  </span>
                  <span>
                    $
                    {(
                      (parseCurrency(selectedProperty.price) *
                        additionalCosts.propertyTax) /
                      100
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Insurance (Annual)</span>
                  <span>${additionalCosts.insurance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Maintenance (Annual)</span>
                  <span>${additionalCosts.maintenance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Inspection Fee</span>
                  <span>${additionalCosts.inspection.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Closing Costs</span>
                  <span>${additionalCosts.closing.toLocaleString()}</span>
                </div>
              </div>

              {/* Total Cost */}
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">
                    Total Initial Costs
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${calculateTotalCost().toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Purchase Button */}
              <button
                onClick={handleStartPurchase}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Purchase Process
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
