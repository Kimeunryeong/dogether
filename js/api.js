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
      console.log("북미", america);
      console.log("기타", etc);

      const content = document.querySelector(".content");
      const contenttitle = document.querySelector(".detail-title");
      const contenttext = document.querySelector(".detail-text");
      let title;
      let detailtext;
      switch (clickedDataId) {
        case "음식점":
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
const cafeData = () => {
  fetch("../json/cafe.json")
    .then((response) => response.json())
    .then((data) => {
      let cafe = [];
      data?.forEach((item) => {
        item.CTGRY_THREE_NM?.includes("카페") && cafe.push(item);
      });
      console.log("카페", cafe);
      
      // 처음 10개의 데이터만 가져오기
      const firstPageData = cafe.slice(0, 10);
      renderCafeData(firstPageData);
      // 전체 데이터의 갯수를 이용하여 페이지 버튼 생성
      const totalPages = Math.ceil(cafe?.length / 10); // 10은 한 페이지에 보여줄 게시글의 수
      createPageBtn(totalPages);
    })
    .catch((error) => {
      console.error("데이터를 불러오는 도중 에러가 발생했습니다:", error);
    });
}
// 페이지네이션
// 서버로부터 받은 데이터를 화면에 렌더링하는 함수
const renderCafeData = (data) => {
  const content = document.querySelector(".content");
  const contenttitle = document.querySelector(".detail-title");
  const contenttext = document.querySelector(".detail-text");

   // 이전에 렌더링된 내용을 제거
   content.innerHTML = "";

  // 제목과 설명이 없는 경우에만 생성
  if (contenttitle.innerHTML === "" && contenttext.innerHTML === "") {
    const title = document.createElement("div");
    title.textContent = "카페";
    const detailtext = document.createElement("div");
    detailtext.textContent = `나와 가까운 ${title.textContent}을(를) 검색해보세요.`;

    contenttitle.appendChild(title);
    contenttext.appendChild(detailtext);
  }

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
// 버튼 생성
const createPageBtn = (totalPages) => {
  const pageContainer = document.querySelector(".page-container");
  pageContainer.innerHTML = ""; // 이전에 생성된 버튼 제거
  
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.addEventListener("click", () => requestPage(i));
    pageContainer.appendChild(button);
    button.classList.add("page-btn");
  }
  // 초기 로드 시 첫 번째 버튼에 스타일 적용
  btnOn(1);
};
// 클릭된 버튼에만 클래스 추가하여 스타일을 변경하는 함수
const btnOn = (currentPage) => {
  const buttons = document.querySelectorAll(".page-container button");
  buttons.forEach((item, index) => {
    if (index + 1 === currentPage) {
      item.classList.add("btn-on"); // 클릭된 버튼에 활성화 클래스 추가
    } else {
      item.classList.remove("btn-on"); // 클릭되지 않은 버튼에는 활성화 클래스 제거
    }
  });
};
// 페이지 번호를 클릭했을 때 데이터를 요청하는 함수
const requestPage = async (page) => {
  try {
    fetch("../json/cafe.json")
    .then((response) => response.json())
    .then((data) => {
      let cafe = [];
      data?.forEach((item) => {
        item.CTGRY_THREE_NM?.includes("카페") && cafe.push(item);
      });
      console.log("카페", cafe);
        
      // 페이지 당 항목 수
      const itemsPerPage = 10;
      // 요청할 데이터의 시작 인덱스
      const startIndex = (page - 1) * itemsPerPage;
      // 요청할 데이터의 끝 인덱스
      const endIndex = startIndex + itemsPerPage;
      // 페이지에 해당하는 데이터 가져오기
      const pageData = cafe.slice(startIndex, endIndex);

      // 화면에 데이터 렌더링
      renderCafeData(pageData);
      // 버튼을 활성화하는 함수 호출
      btnOn(page);
      })
  } catch (error) {
      console.error(error);
  }
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