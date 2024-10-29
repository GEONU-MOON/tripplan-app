import React, { useState } from "react";
import "../../styles/common.css";
import "./TravelItineraryPage.css";

const TravelItineraryPage = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [itemType, setItemType] = useState("");
  const [items, setItems] = useState([]);

  const openPopup = () => setPopupVisible(true);
  const closePopup = () => setPopupVisible(false);

  const handleItemTypeChange = (event) => {
    setItemType(event.target.value);
  };

  const addMoveItem = () => {
    const transportType = document.getElementById("transport-type").value;
    const time = document.getElementById("move-time").value;
    const title = document.getElementById("move-title").value;
    const description = document.getElementById("move-description").value;
    const price = document.getElementById("move-price").value;

    const newItem = {
      type: "move",
      transportType,
      time,
      title,
      description,
      price,
    };

    setItems([...items, newItem]);
    closePopup();
  };

  const addDefaultItem = () => {
    const time = document.getElementById("default-time").value;
    const title = document.getElementById("default-title").value;
    const description = document.getElementById("default-description").value;
    const qty = document.getElementById("default-qty").value;
    const imgURL = document.getElementById("default-img").value;
    const tags = document
      .getElementById("default-tags")
      .value.split(",")
      .map((tag) => tag.trim());

    const newItem = {
      type: "default",
      time,
      title,
      description,
      qty,
      imgURL,
      tags,
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
        <div className="popup-overlay">
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
                <select id="transport-type">
                  <option value="plane_start">비행기 이륙</option>
                  <option value="plane_end">비행기 착륙</option>
                  <option value="bus">버스</option>
                  <option value="subway">열차</option>
                  <option value="taxi">택시</option>
                  <option value="walk">걷기</option>
                  <option value="boat">보트</option>
                </select>
                <label>
                  시간: <input type="time" id="move-time" />
                </label>
                <label>
                  출발지:{" "}
                  <input
                    type="text"
                    id="move-title"
                    placeholder="출발지 입력"
                  />
                </label>
                <label>
                  설명:{" "}
                  <input
                    type="text"
                    id="move-description"
                    placeholder="설명 입력"
                  />
                </label>
                <label>
                  가격:{" "}
                  <input
                    type="number"
                    id="move-price"
                    placeholder="가격 입력"
                  />
                </label>
                <button onClick={addMoveItem}>이동 항목 추가</button>
              </div>
            )}

            {itemType === "default" && (
              <div id="default-form" className="item-form">
                <label>
                  시간: <input type="time" id="default-time" />
                </label>
                <label>
                  제목:{" "}
                  <input
                    type="text"
                    id="default-title"
                    placeholder="제목 입력"
                  />
                </label>
                <label>
                  설명:{" "}
                  <input
                    type="text"
                    id="default-description"
                    placeholder="설명 입력"
                  />
                </label>
                <label>
                  수량:{" "}
                  <input
                    type="number"
                    id="default-qty"
                    placeholder="수량 입력"
                  />
                </label>
                <label>
                  이미지 URL:{" "}
                  <input
                    type="text"
                    id="default-img"
                    placeholder="이미지 URL 입력"
                  />
                </label>
                <label>
                  해시태그:{" "}
                  <input
                    type="text"
                    id="default-tags"
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
            <ul key={index} className={item.type}>
              <div className="info">
                <li className="date">{item.time}</li>
                <li className="title">{item.title}</li>
                <li className="txt">{item.description}</li>
              </div>
              {item.type === "move" ? (
                <div className="ico">
                  <img src={`/img/${item.transportType}.svg`} alt="transport" />
                </div>
              ) : (
                <div className="thumb">
                  <div className="qty">{item.qty}</div>
                  <div className="box">
                    <img src={item.imgURL} alt="Thumbnail" />
                  </div>
                </div>
              )}
              <div className="link">
                {item.tags &&
                  item.tags.map((tag, i) => (
                    <span key={i} className="tag">
                      #{tag}
                    </span>
                  ))}
              </div>
              <div className="action-buttons">
                <button className="edit-btn">
                  <i className="fas fa-pencil-alt"></i>
                </button>
                <button className="delete-btn">
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </ul>
          ))
        )}
      </div>
    </div>
  );
};

export default TravelItineraryPage;
