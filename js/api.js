const serviceKey = "b26f3923-0250-4ed3-8329-54b04f6af8a2";
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const clickedDataId = params.get("dataId");
  console.log(clickedDataId); // 출력: 동남아시아
  // 세계음식 데이터
  const foodData = async () => {
    try {
      const response = await fetch(
        `http://api.kcisa.kr/openapi/API_TOU_052/request?serviceKey=${serviceKey}`,
        {
          headers: {
            accept: "application/json",
          },
        }
      );
      const json = await response.json();
      let pet = json?.response?.body?.items?.item?.filter((item) =>
        // 부산광역시 음식점
        // item?.address?.includes("부산광역시") &&
        item?.information?.includes("동반 입장가능")
      );
      // console.log(pet);
      // 동남아시아, 유럽, 인도, 북미남미, 기타
      let southEastAsia = [],
        europe = [],
        eastAsia = [],
        america = [],
        etc = [];
      pet?.forEach((item) => {
        if (item.category2?.includes("동남아시아")) southEastAsia.push(item);
        else if (item.category2?.includes("동아시아")) eastAsia.push(item);
        else if (item.category2?.includes("유럽")) europe.push(item);
        else if (
          item.category2?.includes("북미") ||
          item.category2?.includes("남미")
        )
          america.push(item);
        else etc.push(item);
      });
      console.log("동남아시아", southEastAsia);
      console.log("동아시아", eastAsia);
      console.log("유럽", europe);
      console.log("북미", america);
      console.log("기타", etc);

      const content = document.querySelector(".content");
      const contenttitle = document.querySelector(".title");
      let title;
      switch (clickedDataId) {
        case "동남아시아":
          title = document.createElement("h1");
          title.textContent = "동남아시아";
          contenttitle.appendChild(title);
          southEastAsia?.forEach((item) => {
            let wrapperDiv = document.createElement("div");
            let category = document.createElement("h1");
            let address = document.createElement("p");
            let tel = document.createElement("p");
            let date = document.createElement("p");
            let sales = document.createElement("p");
            wrapperDiv.classList.add("detailList");
            category.textContent = item.title;
            address.textContent = `주소: ${item.address}`;
            tel.textContent = `전화번호: ${item.tel}`;
            sales.textContent = `영업시간: ${item.operatingTime.replace(
              /-/g,
              "~"
            )}`;
            date.innerText = item.information.replace(/\|/g, "/");
            wrapperDiv.appendChild(category);
            wrapperDiv.appendChild(address);
            wrapperDiv.appendChild(tel);
            wrapperDiv.appendChild(sales);
            wrapperDiv.appendChild(date);
            content.appendChild(wrapperDiv);
          });
          break;
        case "동아시아":
          title = document.createElement("h1");
          title.textContent = "동아시아";
          contenttitle.appendChild(title);
          eastAsia?.forEach((item) => {
            let wrapperDiv = document.createElement("div");
            let category = document.createElement("h1");
            let address = document.createElement("p");
            let tel = document.createElement("p");
            let date = document.createElement("p");
            let sales = document.createElement("p");
            wrapperDiv.classList.add("detailList");
            category.textContent = item.title;
            address.textContent = `주소: ${item.address}`;
            tel.textContent = `전화번호: ${item.tel}`;
            sales.textContent = `영업시간: ${item.operatingTime.replace(
              /-/g,
              "~"
            )}`;
            date.innerText = item.information.replace(/\|/g, "/");
            wrapperDiv.appendChild(category);
            wrapperDiv.appendChild(address);
            wrapperDiv.appendChild(tel);
            wrapperDiv.appendChild(sales);
            wrapperDiv.appendChild(date);
            content.appendChild(wrapperDiv);
          });
          break;
        case "유럽":
          title = document.createElement("h1");
          title.textContent = "유럽";
          contenttitle.appendChild(title);
          europe?.forEach((item) => {
            let wrapperDiv = document.createElement("div");
            let category = document.createElement("h1");
            let address = document.createElement("p");
            let tel = document.createElement("p");
            let date = document.createElement("p");
            let sales = document.createElement("p");
            wrapperDiv.classList.add("detailList");
            category.textContent = item.title;
            address.textContent = `주소: ${item.address}`;
            tel.textContent = `전화번호: ${item.tel}`;
            sales.textContent = `영업시간: ${item.operatingTime.replace(
              /-/g,
              "~"
            )}`;
            date.innerText = item.information.replace(/\|/g, "/");
            wrapperDiv.appendChild(category);
            wrapperDiv.appendChild(address);
            wrapperDiv.appendChild(tel);
            wrapperDiv.appendChild(sales);
            wrapperDiv.appendChild(date);
            content.appendChild(wrapperDiv);
          });
          break;
        case "아메리카":
          title = document.createElement("h1");
          title.textContent = "아메리카";
          contenttitle.appendChild(title);
          america?.forEach((item) => {
            let wrapperDiv = document.createElement("div");
            let category = document.createElement("h1");
            let address = document.createElement("div");
            let tel = document.createElement("div");
            let date = document.createElement("div");
            wrapperDiv.classList.add("detailList");
            category.textContent = item.title;
            address.textContent = `주소 : ${item.address}`;
            tel.textContent = `전화번호 : ${item.tel}`;
            date.textContent = item.information;
            wrapperDiv.appendChild(category);
            wrapperDiv.appendChild(address);
            wrapperDiv.appendChild(tel);
            wrapperDiv.appendChild(date);
            content.appendChild(wrapperDiv);
          });
          break;
        case "기타":
          title = document.createElement("h1");
          title.textContent = "인도, 아프리카, 오세아니아..";
          contenttitle.appendChild(title);
          etc?.forEach((item) => {
            let wrapperDiv = document.createElement("div");
            let category = document.createElement("h1");
            let address = document.createElement("div");
            let tel = document.createElement("div");
            let date = document.createElement("div");
            wrapperDiv.classList.add("detailList");
            category.textContent = item.title;
            address.textContent = `주소 : ${item.address}`;
            tel.textContent = `전화번호 : ${item.tel}`;
            date.textContent = item.information;
            wrapperDiv.appendChild(category);
            wrapperDiv.appendChild(address);
            wrapperDiv.appendChild(tel);
            wrapperDiv.appendChild(date);
            content.appendChild(wrapperDiv);
          });
          break;
        default:
          console.log("");
      }
    } catch (error) {
      console.error("데이터를 불러오는 도중 에러가 발생했습니다:", error);
      if (error.message.includes("Unexpected token")) foodData();
    }
  };
  foodData();

  // 호텔 데이터
  const hotelData = () => {
    fetch("../json/hotel.json")
      .then((response) => response.json())
      .then((data) => {
        let petOk = [];
        data?.forEach((item) => {
          item.pet_info_cn?.includes("반려동물 동반 가능") && petOk.push(item);
        });
        console.log("호텔", petOk);
        // 호텔 디테일
        const content = document.querySelector(".content");
        const contenttitle = document.querySelector(".title");
        if (clickedDataId === "호텔") {
          title = document.createElement("h1");
          title.textContent = "호텔";
          contenttitle.appendChild(title);
          petOk?.forEach((item) => {
            let wrapperDiv = document.createElement("div");
            let name = document.createElement("h1");
            let address = document.createElement("p");
            let date = document.createElement("p");
            wrapperDiv.classList.add("detailList");
            name.textContent = item.ldgs_nm;
            address.textContent = `주소 : ${item.ldgs_addr}`;
            date.textContent = item.pet_info_cn;
            wrapperDiv.appendChild(name);
            wrapperDiv.appendChild(address);
            wrapperDiv.appendChild(date);
            content.appendChild(wrapperDiv);
          });
        }
      })
      .catch((error) => {
        console.error("데이터를 불러오는 도중 에러가 발생했습니다:", error);
      });
  };
  hotelData();

  // 카페 데이터
  const cafeData = () => {
    fetch("../json/cafe.json")
      .then((response) => response.json())
      .then((data) => {
        let cafe = [];
        data?.forEach((item) => {
          item.CTGRY_THREE_NM?.includes("카페") && cafe.push(item);
        });
        console.log("카페", cafe);
        // console.log(data);
        const content = document.querySelector(".content");
        const contenttitle = document.querySelector(".title");
        if (clickedDataId === "카페") {
          title = document.createElement("h1");
          title.textContent = "카페";
          contenttitle.appendChild(title);
          cafe?.forEach((item) => {
            let wrapperDiv = document.createElement("div");
            let name = document.createElement("h1");
            let type = document.createElement("p");
            let address = document.createElement("p");
            let facility = document.createElement("p");
            let open = document.createElement("p");
            let closed = document.createElement("P");
            let date = document.createElement("p");
            wrapperDiv.classList.add("detailList");
            name.textContent = item.FCLTY_NM;
            type.textContent = `종류 : ${item.FCLTY_INFO_DC}`;
            address.textContent = `주소 : ${item.LNM_ADDR}`;
            facility.textContent = `시설정보설명 : ${item.FCLTY_INFO_DC}`;
            open.textContent = `영업시간 : ${item.OPER_TIME}`;
            closed.textContent = `휴무일 : ${item.RSTDE_GUID_CN}`;
            date.textContent = item.pet_info_cn;
            wrapperDiv.appendChild(name);
            wrapperDiv.appendChild(type);
            wrapperDiv.appendChild(address);
            wrapperDiv.appendChild(facility);
            wrapperDiv.appendChild(open);
            wrapperDiv.appendChild(closed);
            content.appendChild(wrapperDiv);
          });
        }
      })
      .catch((error) => {
        console.error("데이터를 불러오는 도중 에러가 발생했습니다:", error);
      });
  };
  cafeData();
});
