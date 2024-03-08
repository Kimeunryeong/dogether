const serviceKey = "b26f3923-0250-4ed3-8329-54b04f6af8a2";
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const clickedDataId = params.get("dataId");
  console.log(clickedDataId); // param 확인

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
      // 동반입장 가능 가게 배열
      const json = await response.json();
      let pet = json?.response?.body?.items?.item?.filter((item) =>
        item?.information?.includes("동반 입장가능")
      );
      // console.log(pet);
      // 동반입장 가능 가게 중 동남아시아, 유럽, 인도, 북미남미, 기타 분류
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
      console.log("남미.북미", america);
      console.log("기타", etc);

      const content = document.querySelector(".content");
      const contenttitle = document.querySelector(".detail-title");
      const contenttext = document.querySelector(".detail-text");
      let title;
      let detailtext;
      // 카테고리
      const category = document.querySelector(".category");
      const southEastAsiaBtn = document.createElement("button");
      const eastAsiaBtn = document.createElement("button");
      const europeBtn = document.createElement("button");
      const americaBtn = document.createElement("button");
      const etcBtn = document.createElement("button");
      southEastAsiaBtn.textContent = "동남아시아 음식"
      eastAsiaBtn.textContent = "동아시아 음식"
      europeBtn.textContent = "유럽 음식"
      americaBtn.textContent = "남미·북미 음식"
      etcBtn.textContent = "기타"
      category.appendChild(southEastAsiaBtn);
      category.appendChild(eastAsiaBtn);
      category.appendChild(europeBtn);
      category.appendChild(americaBtn);
      category.appendChild(etcBtn);

      switch (clickedDataId) {
        case "동남아시아":
          title = document.createElement("div");
          title.textContent = "음식점";
          detailtext = document.createElement("div");
          detailtext.textContent = `나와 가까운 ${title.textContent}을(를) 검색해보세요.`;
          southEastAsia?.forEach((item) => {
            let flexDiv = document.createElement("div");
            let wrapperDiv = document.createElement("div");
            let textDiv = document.createElement("div");
            let category = document.createElement("h1");
            let address = document.createElement("p");
            let tel = document.createElement("p");
            let date = document.createElement("p");
            let sales = document.createElement("p");
            flexDiv.classList.add("detailflex");
            wrapperDiv.classList.add("detailtitle");
            textDiv.classList.add("detailList");
            category.textContent = item.title;
            address.innerHTML = `<p style="font-size: 1.5rem; ">주소</p> ${item.address}`;
            tel.innerHTML = `<p style="font-size: 1.5rem;">전화번호</p>${item.tel}`;
            sales.innerHTML = `<p style="font-size: 1.5rem;">기타정보</p>${item.operatingTime.replace(
              /-/g,
              "~"
            )}`;
            date.innerHTML = `<p style="font-size: 1.5rem;">영업시간</p>${item.information.replace(
              /\|/g,
              "/"
            )}`;
            contenttitle.appendChild(title);
            contenttext.appendChild(detailtext);
            wrapperDiv.appendChild(category);
            textDiv.appendChild(address);
            textDiv.appendChild(tel);
            textDiv.appendChild(sales);
            textDiv.appendChild(date);
            flexDiv.appendChild(wrapperDiv);
            flexDiv.appendChild(textDiv);
            content.appendChild(flexDiv);
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
            wrapperDiv.classList.add("detail-list");
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

  // 호텔 데이터
  const hotelData = () => {
    fetch("../json/hotel.json")
      .then((response) => response.json())
      .then((data) => {
        let petOk = [];
        data?.forEach((item) => {
          item.pet_info_cn?.includes("반려동물 동반 가능") && petOk.push(item);
        });
        console.log("숙소", petOk);
        // 호텔 디테일
        const content = document.querySelector(".content");
        const contenttitle = document.querySelector(".detail-title");
        const contenttext = document.querySelector(".detail-text");
        let title;
        let detailtext;
        if (clickedDataId === "숙소") {
          title = document.createElement("div");
          title.textContent = "숙소";
          detailtext = document.createElement("div");
          detailtext.textContent = `나와 가까운 ${title.textContent}을(를) 검색해보세요.`;
          petOk?.forEach((item) => {
            let flexDiv = document.createElement("div");
            let wrapperDiv = document.createElement("div");
            let textDiv = document.createElement("div");
            let name = document.createElement("h1");
            let address = document.createElement("p");
            let date = document.createElement("p");
            flexDiv.classList.add("detailflex");
            wrapperDiv.classList.add("detailtitle");
            textDiv.classList.add("detailList");
            name.textContent = item.ldgs_nm;
            address.innerHTML = `<p style="font-size: 1.5rem; ">주소</p> ${item.ldgs_addr}`;
            date.innerHTML = `<p style="font-size: 1.5rem;">기타정보</p> ${item.pet_info_cn}`;
            contenttitle.appendChild(title);
            contenttext.appendChild(detailtext);
            wrapperDiv.appendChild(name);
            textDiv.appendChild(address);
            textDiv.appendChild(date);
            flexDiv.appendChild(wrapperDiv);
            flexDiv.appendChild(textDiv);
            content.appendChild(flexDiv);
          });
        }
      })
      .catch((error) => {
        console.error("데이터를 불러오는 도중 에러가 발생했습니다:", error);
      });
  };

  // 미술관 데이터
  const galleryData = () => {
    fetch("../json/cafe.json")
      .then((response) => response.json())
      .then((data) => {
        let gallery = [];
        data?.forEach((item) => {
          item.CTGRY_THREE_NM?.includes("미술관") && gallery.push(item);
        });
        console.log("미술관", gallery);
        // console.log(data);
        const content = document.querySelector(".content");
        const contenttitle = document.querySelector(".detail-title");
        const contenttext = document.querySelector(".detail-text");
        let title;
        let detailtext;
        if (clickedDataId === "미술관") {
          title = document.createElement("div");
          title.textContent = "미술관";
          detailtext = document.createElement("div");
          detailtext.textContent = `나와 가까운 ${title.textContent}을(를) 검색해보세요.`;
          gallery?.forEach((item) => {
            let flexDiv = document.createElement("div");
            let wrapperDiv = document.createElement("div");
            let textDiv = document.createElement("div");
            let name = document.createElement("h1");
            let type = document.createElement("p");
            let address = document.createElement("p");
            let facility = document.createElement("p");
            let open = document.createElement("p");
            let closed = document.createElement("P");
            // let date = document.createElement("p");
            flexDiv.classList.add("detailflex");
            wrapperDiv.classList.add("detailtitle");
            textDiv.classList.add("detailList");
            name.textContent = item.FCLTY_NM;
            type.innerHTML = `<p style="font-size: 1.5rem; ">종류</p> ${item.FCLTY_INFO_DC}`;
            address.innerHTML = `<p style="font-size: 1.5rem; ">주소</p> ${item.LNM_ADDR}`;
            facility.innerHTML = `<p style="font-size: 1.5rem; ">시설정보설명</p> ${item.FCLTY_INFO_DC}`;
            open.innerHTML = `<p style="font-size: 1.5rem; ">영업시간</p> ${item.OPER_TIME}`;
            closed.innerHTML = `<p style="font-size: 1.5rem; ">휴무일</p> ${item.RSTDE_GUID_CN}`;
            // date.textContent = `<p style="font-size: 1.5rem; ">기타정보</p> ${item.pet_info_cn}`;

            contenttitle.appendChild(title);
            contenttext.appendChild(detailtext);
            wrapperDiv.appendChild(name);
            textDiv.appendChild(type);
            textDiv.appendChild(address);
            textDiv.appendChild(facility);
            textDiv.appendChild(open);
            textDiv.appendChild(closed);
            // textDiv.appendChild(date);
            flexDiv.appendChild(wrapperDiv);
            flexDiv.appendChild(textDiv);
            content.appendChild(flexDiv);
          });
        }
      })
      .catch((error) => {
        console.error("데이터를 불러오는 도중 에러가 발생했습니다:", error);
      });
  };


// 카페 데이터
// 페이지네이션
const PAGE_SIZE = 10; // 한 페이지에 표시할 항목 수
const cafeData = () => {
  fetch("../json/cafe.json")
    .then((response) => response.json())
    .then((data) => {
      let cafe = [];
      data?.forEach((item) => {
        item.CTGRY_THREE_NM?.includes("카페") && cafe.push(item);
      });
      console.log("카페", cafe);

      // 페이지네이션
      const totalPages = Math.ceil(cafe.length / PAGE_SIZE); // 전체 페이지 수 계산
      renderPageButtons(totalPages, 1); // 페이지 버튼 렌더링
      renderCafeData(cafe.slice(0, PAGE_SIZE)); // 초기 페이지 데이터 렌더링
       // 타이틀과 디테일 텍스트 추가
       const title = document.createElement("div");
       title.textContent = "카페";
       const detailtext = document.createElement("div");
       detailtext.textContent = `나와 가까운 ${title.textContent}을(를) 검색해보세요.`;
       const contenttitle = document.querySelector(".detail-title");
       const contenttext = document.querySelector(".detail-text");
       contenttitle.appendChild(title);
       contenttext.appendChild(detailtext);
    })
    .catch((error) => {
      console.error("데이터를 불러오는 도중 에러가 발생했습니다:", error);
    });
};
// 페이지 버튼 렌더링 함수
const renderPageButtons = (totalPages, currentPage) => {
  const pageContainer = document.querySelector(".page-container");
  pageContainer.innerHTML = ""; // 기존 페이지 버튼 초기화

  // 시작 페이지와 끝 페이지 계산
  let startPage = Math.max(currentPage - 5, 1);
  let endPage = Math.min(startPage + 9, totalPages);

  // 이전 버튼
  if (currentPage > 1) {
    const prevButton = document.createElement("button");
    prevButton.textContent = "이전";
    prevButton.addEventListener("click", () => requestPage(currentPage - 1));
    pageContainer.appendChild(prevButton);
    prevButton.classList.add("prev-btn");
  }

  // 페이지 버튼 생성
  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.addEventListener("click", () => requestPage(i));
    button.classList.add("page-btn"); // 페이지 버튼에 CSS 클래스 추가
    if (i === currentPage) {
      button.classList.add("btn-on"); // 현재 페이지 버튼에 추가 CSS 클래스
    }
    pageContainer.appendChild(button);
  }

  // 다음 버튼
  if (currentPage < totalPages) {
    const nextButton = document.createElement("button");
    nextButton.textContent = "다음";
    nextButton.addEventListener("click", () => requestPage(currentPage + 1));
    pageContainer.appendChild(nextButton);
    nextButton.classList.add("next-btn");
  }
};
// 페이지 데이터 요청 함수
const requestPage = (page) => {
  fetch("../json/cafe.json")
    .then((response) => response.json())
    .then((data) => {
      let cafe = [];
      data?.forEach((item) => {
        item.CTGRY_THREE_NM?.includes("카페") && cafe.push(item);
      });
      console.log("카페", cafe);

      // 요청할 페이지의 데이터 가져오기
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const pageData = cafe.slice(startIndex, endIndex);

      // 페이지 버튼 재렌더링 및 데이터 렌더링
      renderPageButtons(Math.ceil(cafe.length / PAGE_SIZE), page);
      renderCafeData(pageData);
    })
    .catch((error) => {
      console.error("데이터를 불러오는 도중 에러가 발생했습니다:", error);
    });
};
// 카페 데이터 렌더링 함수
const renderCafeData = (data) => {
  const content = document.querySelector(".content");
  content.innerHTML = ""; // 기존 카페 데이터 초기화

  data.forEach((item) => {
    const flexDiv = document.createElement("div");
    const wrapperDiv = document.createElement("div");
    const textDiv = document.createElement("div");
    const name = document.createElement("h1");
    const type = document.createElement("p");
    const address = document.createElement("p");
    const facility = document.createElement("p");
    const open = document.createElement("p");
    const closed = document.createElement("p");

    flexDiv.classList.add("detailflex");
    wrapperDiv.classList.add("detailtitle");
    textDiv.classList.add("detailList");

    name.textContent = item.FCLTY_NM;
    type.innerHTML = `<p style="font-size: 1.5rem;">종류</p> ${item.FCLTY_INFO_DC}`;
    address.innerHTML = `<p style="font-size: 1.5rem;">주소</p> ${item.LNM_ADDR}`;
    facility.innerHTML = `<p style="font-size: 1.5rem;">시설정보설명</p> ${item.FCLTY_INFO_DC}`;
    open.innerHTML = `<p style="font-size: 1.5rem;">영업시간</p> ${item.OPER_TIME}`;
    closed.innerHTML = `<p style="font-size: 1.5rem;">휴무일</p> ${item.RSTDE_GUID_CN}`;

    wrapperDiv.appendChild(name);
    textDiv.appendChild(type);
    textDiv.appendChild(address);
    textDiv.appendChild(facility);
    textDiv.appendChild(open);
    textDiv.appendChild(closed);

    flexDiv.appendChild(wrapperDiv);
    flexDiv.appendChild(textDiv);

    content.appendChild(flexDiv);
  });
};
  
switch (clickedDataId) {
  case "음식점":
    foodData();
    break;
  case "숙소":
    hotelData();
    break;
  case "미술관":
    galleryData();
    break;
  case "카페":
    cafeData();
    break;
  default:
    console.log("");
}});