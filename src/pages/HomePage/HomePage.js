import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import "../../styles/common.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupTitle, setPopupTitle] = useState("새로운 여행 등록");
  const [tripData, setTripData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    description: "",
    tags: "",
  });

  // 팝업 열기 함수
  const openPopup = (isEdit = false, data = null) => {
    if (isEdit && data) {
      setPopupTitle("여행 수정");
      setTripData(data);
    } else {
      setPopupTitle("새로운 여행 등록");
      setTripData({
        title: "",
        startDate: "",
        endDate: "",
        description: "",
        tags: "",
      });
    }
    setPopupVisible(true);
  };

  // 팝업 닫기 함수
  const closePopup = () => setPopupVisible(false);

  // 입력 값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData({ ...tripData, [name]: value });
  };

  // 페이지 이동
  const goToTravelItineraryPage = () => {
    navigate("/itinerary");
  };

  return (
    <div className="wrap">
      <div className="top">
        <img src="/img/logo.svg" alt="Logo" /> 트립플랜
      </div>

      <div className="homepage-list">
        <ul className="homepage-trip-item">
          <div
            className="homepage-info"
            onClick={goToTravelItineraryPage}
            data-title="뉴욕 여행"
            data-start-date="2024-10-24"
            data-end-date="2024-10-25"
            data-description="뉴욕의 숨은 명소 투어"
            data-tags="태그 1,태그 2"
          >
            <li className="homepage-date">2024-10-24 ~ 2024-10-25</li>
            <li className="homepage-title">뉴욕 여행</li>
            <li className="homepage-txt">뉴욕의 숨은 명소 투어</li>
          </div>
          <div className="homepage-thumb">
            <img
              src="https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/6204f3a9-7443-4913-8779-1028949ac5d4.jpeg"
              alt="Thumbnail 1"
            />
          </div>
          <div className="homepage-link">
            <div className="homepage-tag-container">
              <span className="homepage-tag">#태그 1</span>
              <span className="homepage-tag">#태그 2</span>
            </div>
          </div>
          <div className="homepage-action-buttons">
            <button
              className="homepage-edit-btn"
              onClick={(e) => {
                e.stopPropagation();
                openPopup(true, {
                  title: "뉴욕 여행",
                  startDate: "2024-10-24",
                  endDate: "2024-10-25",
                  description: "뉴욕의 숨은 명소 투어",
                  tags: "태그 1,태그 2",
                });
              }}
            >
              <i className="fas fa-pencil-alt"></i>
            </button>
            <button
              className="homepage-delete-btn"
              onClick={(e) => e.stopPropagation()}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        </ul>
      </div>

      <div className="homepage-register-btn-container">
        <button className="homepage-register-btn" onClick={() => openPopup()}>
          <i className="fa fa-plus-circle"></i> 등록
        </button>
      </div>

      {popupVisible && (
        <div className="homepage-popup-overlay" style={{ display: "flex" }}>
          <div className="homepage-popup-content">
            <h2>{popupTitle}</h2>
            <form>
              <label htmlFor="trip-title">여행 제목</label>
              <input
                type="text"
                id="trip-title"
                name="title"
                value={tripData.title}
                onChange={handleChange}
                placeholder="여행 제목 입력"
              />

              <label htmlFor="trip-start-date">여행 시작일</label>
              <input
                type="date"
                id="trip-start-date"
                name="startDate"
                value={tripData.startDate}
                onChange={handleChange}
              />

              <label htmlFor="trip-end-date">여행 종료일</label>
              <input
                type="date"
                id="trip-end-date"
                name="endDate"
                value={tripData.endDate}
                onChange={handleChange}
              />

              <label htmlFor="trip-description">여행 설명</label>
              <textarea
                id="trip-description"
                name="description"
                value={tripData.description}
                onChange={handleChange}
                placeholder="여행 설명 입력"
              ></textarea>

              <label htmlFor="trip-tags">태그</label>
              <input
                type="text"
                id="trip-tags"
                name="tags"
                value={tripData.tags}
                onChange={handleChange}
                placeholder="태그 입력 (쉼표로 구분)"
              />

              <div className="homepage-popup-buttons">
                <button type="submit" className="homepage-submit-btn">
                  등록
                </button>
                <button
                  type="button"
                  className="homepage-close-btn"
                  onClick={closePopup}
                >
                  닫기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
