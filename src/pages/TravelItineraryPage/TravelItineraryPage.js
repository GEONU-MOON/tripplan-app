import React, { useState } from "react";
import "../../styles/common.css";
import "./TravelItineraryPage.css";

const TravelItineraryPage = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [itemType, setItemType] = useState("");
  const [items, setItems] = useState([]);

  const [formData, setFormData] = useState({
    transportType: "plane_start",
    time: "",
    title: "",
    description: "",
    price: "",
    imgURLs: "", // 쉼표로 구분된 이미지 URL 문자열
    tags: "",
  });

  const openPopup = () => {
    setPopupVisible(true);
    setFormData({
      transportType: "plane_start",
      time: "",
      title: "",
      description: "",
      price: "",
      imgURLs: "",
      tags: "",
    });
  };

  const closePopup = () => {
    setPopupVisible(false);
    setItemType("");
  };

  const handleItemTypeChange = (event) => setItemType(event.target.value);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addMoveItem = () => {
    const newItem = {
      type: "move",
      transportType: formData.transportType,
      time: formData.time,
      title: formData.title,
      description: formData.description,
      price: formData.price,
    };

    setItems([...items, newItem]);
    closePopup();
  };

  const addDefaultItem = () => {
    const imageUrls = (formData.imgURLs || "")
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url); // 빈 문자열 제거

    const newItem = {
      type: "default",
      time: formData.time,
      title: formData.title,
      description: formData.description,
      qty: imageUrls.length, // 수량을 이미지 URL의 개수로 설정
      imgURLs: imageUrls, // imgURLs 배열로 저장
      tags: (formData.tags || "")
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };

    setItems([...items, newItem]);
    closePopup();
  };

  return (
    <div className="wrap">
      <div className="top">
        <img src="/img/logo.svg" alt="Logo" /> 뉴욕 여행
      </div>

      <div className="tab">
        <ul className="on">2024-10-24</ul>
        <ul>2024-10-25</ul>
      </div>

      <div className="floating-btn" onClick={openPopup}>
        +
      </div>

      {popupVisible && (
        <div
          className="popup-overlay"
          style={{ display: popupVisible ? "flex" : "none" }}
        >
          <div className="popup-content">
            <h3>항목 추가</h3>
            <label htmlFor="item-type">항목 유형 선택:</label>
            <select
              id="item-type"
              value={itemType}
              onChange={handleItemTypeChange}
            >
              <option value="">선택</option>
              <option value="move">이동</option>
              <option value="default">일반</option>
            </select>

            {itemType === "move" && (
              <div id="move-form" className="item-form">
                <label htmlFor="transport-type">이동 수단 선택:</label>
                <select
                  id="transport-type"
                  name="transportType"
                  value={formData.transportType}
                  onChange={handleChange}
                >
                  <option value="plane_start">비행기 이륙</option>
                  <option value="plane_end">비행기 착륙</option>
                  <option value="bus">버스</option>
                  <option value="subway">열차</option>
                  <option value="taxi">택시</option>
                  <option value="walk">걷기</option>
                  <option value="boat">보트</option>
                </select>
                <label>
                  시간:{" "}
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  출발지:{" "}
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="출발지 입력"
                  />
                </label>
                <label>
                  설명:{" "}
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="설명 입력"
                  />
                </label>
                <label>
                  가격:{" "}
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="가격 입력"
                  />
                </label>
                <button onClick={addMoveItem}>이동 항목 추가</button>
              </div>
            )}

            {itemType === "default" && (
              <div id="default-form" className="item-form">
                <label>
                  시간:{" "}
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  제목:{" "}
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="제목 입력"
                  />
                </label>
                <label>
                  설명:{" "}
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="설명 입력"
                  />
                </label>
                <label>
                  이미지 URL:{" "}
                  <input
                    type="text"
                    name="imgURLs"
                    value={formData.imgURLs}
                    onChange={handleChange}
                    placeholder="이미지 URL 입력 (쉼표로 구분)"
                  />
                </label>
                <label>
                  해시태그:{" "}
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="태그 입력 (쉼표로 구분)"
                  />
                </label>
                <button onClick={addDefaultItem}>일반 항목 추가</button>
              </div>
            )}
            <button onClick={closePopup}>닫기</button>
          </div>
        </div>
      )}

      <div className="list" id="item-list">
        {items.length === 0 ? (
          <p className="no-items-message">일정을 등록하세요</p>
        ) : (
          items.map((item, index) => (
            <ul key={index} className={`item ${item.type}`}>
              <div className="info">
                <li className="date">{item.time}</li>
                <li className="title">{item.title}</li>
                <li className="txt">{item.description}</li>
              </div>

              {item.type === "move" ? (
                <>
                  <div className="ico">
                    <img
                      src={`/img/${item.transportType}.svg`}
                      alt="transport"
                    />
                  </div>
                  <div className="action-and-price">
                    <span className="price">${item.price}</span>
                    <div className="action-buttons">
                      <button className="edit-btn">
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button className="delete-btn">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="thumb">
                    <div className="qty">
                      {item.imgURLs ? item.imgURLs.length : 0}
                    </div>{" "}
                    {/* 안전하게 수량 표시 */}
                    <div className="box">
                      {(item.imgURLs || []).map((url, i) => (
                        <img key={i} src={url} alt={`Thumbnail ${i + 1}`} />
                      ))}
                    </div>
                  </div>
                  <div className="link">
                    {item.tags &&
                      item.tags.map((tag, i) => (
                        <span key={i} className="tag">
                          #{tag}
                        </span>
                      ))}
                    <div className="action-buttons">
                      <button className="edit-btn">
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button className="delete-btn">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </ul>
          ))
        )}
      </div>
    </div>
  );
};

export default TravelItineraryPage;
