import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import example from "@/assets/example.json";

const GOOGLE_MAPS_LIBRARIES: "marker"[] = ["marker"];

interface Property {
  region_id: number;
  region_name: number;
  city: string;
  state: string;
  metro: string;
  county_name: string;
  price: number;
  latitude: number;
  longitude: number;
}

const PropertyDetailPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [showPurchaseProcess, setShowPurchaseProcess] = useState(false);
  const [additionalCosts, setAdditionalCosts] = useState({
    downPayment: 20, // 계약금 비율 (%)
    propertyTax: 1.2, // 재산세 비율 (%)
    insurance: 1200, // 연간 보험료
    maintenance: 2400, // 연간 관리비
    inspection: 500, // 검사 비용
    closing: 5000, // 클로징 비용
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY!,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const handleLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  useEffect(() => {
    // 실제로는 API 호출을 하겠지만, 지금은 example 데이터 사용
    const propertyData = example.properties.find(
      (p) => p.region_id === Number(id)
    );
    setProperty(propertyData || null);
  }, [id]);

  const handleModalClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowPurchaseProcess(false);
    }
  };

  useEffect(() => {
    if (!map || !property) return;

    new google.maps.marker.AdvancedMarkerElement({
      position: { lat: property.latitude, lng: property.longitude },
      map,
      title: property.city,
    });
  }, [map, property]);

  const navigate = useNavigate();

  const handlePurchaseClick = () => {
    navigate(`/purchase-process/${property.region_id}`);
  };

  if (!property || !isLoaded) return <div>Loading...</div>;

  const calculateTotalCost = () => {
    const downPaymentAmount =
      (property.price * additionalCosts.downPayment) / 100;
    const propertyTaxAmount =
      (property.price * additionalCosts.propertyTax) / 100;
    const totalCost =
      downPaymentAmount +
      propertyTaxAmount +
      additionalCosts.insurance +
      additionalCosts.maintenance +
      additionalCosts.inspection +
      additionalCosts.closing;
    return totalCost;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 메인 이미지 섹션 */}
      <div className="h-[40vh]">
        <img
          src={`https://picsum.photos/seed/${property.region_id}/1200/800`}
          alt={property.city}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="w-full px-4">
        <div className="py-6">
          {/* 제목 및 기본 정보 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {property.city}, {property.state}
            </h1>
            <p className="text-gray-600">{property.metro}</p>
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
                  center={{ lat: property.latitude, lng: property.longitude }}
                  onLoad={handleLoad}
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
                    <p className="font-semibold">{property.county_name}</p>
                  </div>
                  <div className="p-4 bg-gray-50">
                    <p className="text-sm text-gray-600">지역 코드</p>
                    <p className="font-semibold">{property.region_name}</p>
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
                  ${property.price.toLocaleString()}
                </p>
              </div>

              {/* 추가 비용 항목들 */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>계약금 ({additionalCosts.downPayment}%)</span>
                  <span>
                    $
                    {(
                      (property.price * additionalCosts.downPayment) /
                      100
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>재산세 (연간 {additionalCosts.propertyTax}%)</span>
                  <span>
                    $
                    {(
                      (property.price * additionalCosts.propertyTax) /
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
                onClick={handlePurchaseClick}
                className="w-full bg-blue-600 text-white py-4 font-semibold hover:bg-blue-700 transition-colors"
              >
                구매 절차 시작하기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 구매 프로세스 모달 */}
      {showPurchaseProcess && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleModalClose}
        >
          <div className="bg-white p-8 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">미국 부동산 구매 절차</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50">
                <h3 className="font-semibold">1. 부동산 선택 및 가격 협상</h3>
                <p className="text-gray-600">현재 진행 중</p>
              </div>
              <div className="p-4 bg-gray-50">
                <h3 className="font-semibold">2. 매매계약서 작성</h3>
                <p className="text-gray-600">다음 단계</p>
              </div>
              <div className="p-4 bg-gray-50">
                <h3 className="font-semibold">3. 에스크로 계좌 개설</h3>
              </div>
              <div className="p-4 bg-gray-50">
                <h3 className="font-semibold">4. 주택 검사</h3>
              </div>
              <div className="p-4 bg-gray-50">
                <h3 className="font-semibold">5. 대출 승인</h3>
              </div>
              <div className="p-4 bg-gray-50">
                <h3 className="font-semibold">6. 클로징</h3>
              </div>
            </div>
            <button
              onClick={() => setShowPurchaseProcess(false)}
              className="mt-6 w-full bg-blue-500 text-white py-2 hover:bg-blue-600"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailPage;
