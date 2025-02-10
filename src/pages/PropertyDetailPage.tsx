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

    // 매매가 대신 계약금(downPayment)만 포함
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
      {/* 메인 이미지 섹션 */}
      <div className="h-[40vh]">
        <img
          src={`https://picsum.photos/seed/${selectedProperty.id}/1200/800`}
          alt={selectedProperty.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="w-full px-4">
        <div className="py-6">
          {/* 제목 및 기본 정보 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {selectedProperty.title}
            </h1>
            <p className="text-gray-600">{selectedProperty.address}</p>
          </div>

          {/* 상세 정보 그리드 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 왼쪽: 지도 및 상세 정보 */}
            <div>
              {/* 구글 맵 */}
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
                    // 추가 맵 옵션
                    zoomControl: true,
                    mapTypeControl: false,
                    streetViewControl: true,
                    fullscreenControl: true,
                  }}
                />
              </div>

              {/* 부동산 상세 정보 */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">부동산 정보</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50">
                    <p className="text-sm text-gray-600">지역</p>
                    <p className="font-semibold">{selectedProperty.address}</p>
                  </div>
                  <div className="p-4 bg-gray-50">
                    <p className="text-sm text-gray-600">지역 코드</p>
                    <p className="font-semibold">{selectedProperty.state}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽: 가격 계산기 및 구매 버튼 */}
            <div className="bg-gray-50 p-6">
              <h2 className="text-2xl font-bold mb-6">비용 계산</h2>

              {/* 기본 가격 */}
              <div className="mb-6">
                <p className="text-gray-600">매매가</p>
                <p className="text-3xl font-bold text-blue-600">
                  {selectedProperty.price.toLocaleString()}
                </p>
              </div>

              {/* 추가 비용 항목들 */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>계약금 ({additionalCosts.downPayment}%)</span>
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
                  <span>재산세 (연간 {additionalCosts.propertyTax}%)</span>
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
                  <span>보험료 (연간)</span>
                  <span>${additionalCosts.insurance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>관리비 (연간)</span>
                  <span>${additionalCosts.maintenance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>검사 비용</span>
                  <span>${additionalCosts.inspection.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>클로징 비용</span>
                  <span>${additionalCosts.closing.toLocaleString()}</span>
                </div>
              </div>

              {/* 총 비용 */}
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">총 초기 비용</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${calculateTotalCost().toLocaleString()}
                  </span>
                </div>
              </div>

              {/* 구매 버튼 */}
              <button
                onClick={handleStartPurchase}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                구매 프로세스 시작하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
