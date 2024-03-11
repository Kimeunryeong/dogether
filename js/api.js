let addressArray = [];
const serviceKey = "b26f3923-0250-4ed3-8329-54b04f6af8a2";
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const clickedDataId = params.get("dataId");
  console.log(clickedDataId); // param 확인
  const PAGE_SIZE = 10; // 한 페이지에 표시할 항목 수
  var input = document.getElementById("keyword");

  // 세계음식 데이터 불러오기
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
      // 펫 동반 가능 데이터
      let data = json?.response?.body?.items?.item?.filter((item) =>
        item?.information?.includes("동반 입장가능")
      );
      // 타이틀과 디테일 텍스트 추가
      const title = document.createElement("div");
      title.textContent = "음식점";
      const detailtext = document.createElement("div");
      detailtext.textContent = `나와 가까운 ${title.textContent}을(를) 검색해보세요.`;
      const contenttitle = document.querySelector(".detail-title");
      const contenttext = document.querySelector(".detail-text");
      contenttitle.appendChild(title);
      contenttext.appendChild(detailtext);
      // 카테고리 렌더링
      renderCategory(data);
      // 맨 처음에는 동남아시아 데이터를 렌더링하기
      handleCategoryClick("동남아시아", data);
    } catch (error) {
      console.error("데이터를 불러오는 도중 에러가 발생했습니다:", error);
      if (error?.message.includes("Unexpected token")) foodData();
    }
  };
  // 카테고리 렌더링 함수, 카테고리 클릭 시 실행될 함수
  const renderCategory = (data) => {
    const categoryContainer = document.querySelector(".category");
    categoryContainer.innerHTML = ""; // 기존 카테고리 삭제

    const categories = ["동남아시아", "동아시아", "유럽", "아메리카", "기타"];
    categories.forEach((item) => {
      const button = document.createElement("button");
      button.textContent = item;
      // 카테고리 클릭 시 실행될 함수
      button.addEventListener("click", () => handleCategoryClick(item, data));
      categoryContainer.appendChild(button);
    });
  };
  // 카테고리 클릭 시 처리 함수
  const handleCategoryClick = (category, data) => {
    let filteredData;
    switch (category) {
      case "동남아시아":
        filteredData = data.filter((item) =>
          item.category2?.includes("동남아시아")
        );
        break;
      case "동아시아":
        filteredData = data.filter((item) =>
          item.category2?.includes("동아시아")
        );
        break;
      case "유럽":
        filteredData = data.filter((item) => item.category2?.includes("유럽"));
        break;
      case "아메리카":
        filteredData = data.filter(
          (item) =>
            item.category2?.includes("북미") || item.category2?.includes("남미")
        );
        break;
      case "기타":
        filteredData = data.filter(
          (item) =>
            !(
              item.category2?.includes("동남아시아") ||
              item.category2?.includes("동아시아") ||
              item.category2?.includes("유럽") ||
              item.category2?.includes("북미") ||
              item.category2?.includes("남미")
            )
        );
        break;
      default:
        filteredData = data;
    }
    // 선택된 카테고리에 스타일 추가
    const buttons = document.querySelectorAll(".category button");
    buttons.forEach((button) => {
      if (button.textContent === category) {
        button.classList.add("selected");
      } else {
        button.classList.remove("selected");
      }
    });
    // 선택된 카테고리에 해당하는 데이터 렌더링
    renderDetail(filteredData);
  };
  // 디테일 렌더링 함수
  const renderDetail = (data) => {
    const content = document.querySelector(".content");
    content.innerHTML = ""; // 기존 데이터 삭제

    data?.forEach((item) => {
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
      address.innerHTML = `<p style="font-size: 1.5rem;">주소</p>${item.address}`;
      tel.innerHTML = `<p style="font-size: 1.5rem;">전화번호</p>${item.tel}`;
      sales.innerHTML = `<p style="font-size: 1.5rem;">영업시간</p>${
        item.operatingTime ? item.operatingTime.replace(/-/g, "~") : ""
      }`;
      date.innerHTML = `<p style="font-size: 1.5rem;">기타정보</p>${item.information.replace(
        /\|/g,
        "/"
      )}`;
      wrapperDiv.appendChild(category);
      textDiv.appendChild(address);
      textDiv.appendChild(tel);
      textDiv.appendChild(sales);
      textDiv.appendChild(date);
      flexDiv.appendChild(wrapperDiv);
      flexDiv.appendChild(textDiv);
      content.appendChild(flexDiv);
    });
  };

  // 카페 데이터
  // 페이지네이션
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

  // 숙소 데이터
  const hotelData = () => {
    fetch("../json/hotel.json")
      .then((response) => response.json())
      .then((data) => {
        let petOk = [];
        data?.forEach((item) => {
          item.pet_info_cn?.includes("반려동물 동반 가능") && petOk.push(item);
        });
        console.log("숙소", petOk);

        const totalPages = Math.ceil(petOk.length / PAGE_SIZE); // 전체 페이지 수 계산
        renderPageButtons1(totalPages, 1); // 페이지 버튼 렌더링
        renderhotelData(petOk.slice(0, PAGE_SIZE)); // 초기 페이지 데이터 렌더링
        // 타이틀과 디테일 텍스트 추가
        const title = document.createElement("div");
        title.textContent = "숙소";
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
  const renderPageButtons1 = (totalPages, currentPage) => {
    const pageContainer = document.querySelector(".page-container");
    pageContainer.innerHTML = ""; // 기존 페이지 버튼 초기화

    // 시작 페이지와 끝 페이지 계산
    let startPage = Math.max(currentPage - 5, 1);
    let endPage = Math.min(startPage + 9, totalPages);

    // 이전 버튼
    if (currentPage > 1) {
      const prevButton = document.createElement("button");
      prevButton.textContent = "이전";
      prevButton.addEventListener("click", () => requestPage1(currentPage - 1));
      pageContainer.appendChild(prevButton);
      prevButton.classList.add("prev-btn");
    }
    // 페이지 버튼 생성
    for (let i = startPage; i <= endPage; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.addEventListener("click", () => requestPage1(i));
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
      nextButton.addEventListener("click", () => requestPage1(currentPage + 1));
      pageContainer.appendChild(nextButton);
      nextButton.classList.add("next-btn");
    }
  };
  // 페이지 데이터 요청 함수
  const requestPage1 = (page) => {
    fetch("../json/hotel.json")
      .then((response) => response.json())
      .then((data) => {
        let petOk = [];
        data?.forEach((item) => {
          item.pet_info_cn?.includes("반려동물 동반 가능") && petOk.push(item);
        });
        console.log("반려동물 동반 가능", petOk);

        // 요청할 페이지의 데이터 가져오기
        const startIndex = (page - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        const pageData = petOk.slice(startIndex, endIndex);

        // 페이지 버튼 재렌더링 및 데이터 렌더링
        renderPageButtons1(Math.ceil(petOk.length / PAGE_SIZE), page);
        renderhotelData(pageData);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 도중 에러가 발생했습니다:", error);
      });
  };
  //  데이터 렌더링 함수
  const renderhotelData = (data) => {
    const content = document.querySelector(".content");
    content.innerHTML = ""; // 기존 카페 데이터 초기화
    // 호텔 디테일
    data.forEach((item) => {
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
      wrapperDiv.appendChild(name);

      textDiv.appendChild(address);
      textDiv.appendChild(date);

      flexDiv.appendChild(wrapperDiv);
      flexDiv.appendChild(textDiv);

      content.appendChild(flexDiv);
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

        const totalPages = Math.ceil(gallery.length / PAGE_SIZE); // 전체 페이지 수 계산
        renderPageButtons2(totalPages, 1); // 페이지 버튼 렌더링
        rendergalleryData(gallery.slice(0, PAGE_SIZE)); // 초기 페이지 데이터 렌더링
        // 타이틀과 디테일 텍스트 추가
        const title = document.createElement("div");
        title.textContent = "미술관";
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
  const renderPageButtons2 = (totalPages, currentPage) => {
    const pageContainer = document.querySelector(".page-container");
    pageContainer.innerHTML = ""; // 기존 페이지 버튼 초기화

    // 시작 페이지와 끝 페이지 계산
    let startPage = Math.max(currentPage - 5, 1);
    let endPage = Math.min(startPage + 9, totalPages);

    // 이전 버튼
    if (currentPage > 1) {
      const prevButton = document.createElement("button");
      prevButton.textContent = "이전";
      prevButton.addEventListener("click", () => requestPage2(currentPage - 1));
      pageContainer.appendChild(prevButton);
      prevButton.classList.add("prev-btn");
    }
    // 페이지 버튼 생성
    for (let i = startPage; i <= endPage; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.addEventListener("click", () => requestPage2(i));
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
      nextButton.addEventListener("click", () => requestPage2(currentPage + 1));
      pageContainer.appendChild(nextButton);
      nextButton.classList.add("next-btn");
    }
  };
  // 페이지 데이터 요청 함수
  const requestPage2 = (page) => {
    fetch("../json/cafe.json")
      .then((response) => response.json())
      .then((data) => {
        let gallery = [];
        data?.forEach((item) => {
          item.CTGRY_THREE_NM?.includes("미술관") && gallery.push(item);
        });
        // console.log("미술관", gallery );

        // 요청할 페이지의 데이터 가져오기
        const startIndex = (page - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        const pageData = gallery.slice(startIndex, endIndex);

        // 페이지 버튼 재렌더링 및 데이터 렌더링
        renderPageButtons2(Math.ceil(gallery.length / PAGE_SIZE), page);
        rendergalleryData(pageData);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 도중 에러가 발생했습니다:", error);
      });
  };
  // 미술관 데이터 렌더링 함수
  const rendergalleryData = (data) => {
    const content = document.querySelector(".content");
    content.innerHTML = ""; // 기존 미술관 데이터 초기화
    // 미술관 디테일
    data.forEach((item) => {
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
      type.innerHTML = `<p style="font-size: 1.5rem;">종류</p> ${item.FCLTY_INFO_DC}`;
      address.innerHTML = `<p style="font-size: 1.5rem; ">주소</p> ${item.LNM_ADDR}`;
      facility.innerHTML = `<p style="font-size: 1.5rem; ">시설정보설명</p> ${item.FCLTY_INFO_DC}`;
      open.innerHTML = `<p style="font-size: 1.5rem; ">영업시간</p> ${item.OPER_TIME}`;
      closed.innerHTML = `<p style="font-size: 1.5rem; ">휴무일</p> ${item.RSTDE_GUID_CN}`;
      // date.textContent = `<p style="font-size: 1.5rem; ">기타정보</p> ${item.pet_info_cn}`;

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
  };

  // 병원&약국 데이터
  const hairData = () => {
    fetch("../json/cafe.json")
      .then((response) => response.json())
      .then((data) => {
        let hair = [];
        data?.forEach((item) => {
          item.CTGRY_THREE_NM?.includes("미용") && hair.push(item);
        });
        console.log("미용", hair);
        const totalPages = Math.ceil(hair.length / PAGE_SIZE); // 전체 페이지 수 계산
        renderhairPageButtons(totalPages, 1); // 페이지 버튼 렌더링
        renderhairData(hair.slice(0, PAGE_SIZE)); // 초기 페이지 데이터 렌더링
        // 타이틀과 디테일 텍스트 추가
        const title = document.createElement("div");
        title.textContent = "미용";
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
  const renderhairPageButtons = (totalPages, currentPage) => {
    const pageContainer = document.querySelector(".page-container");
    pageContainer.innerHTML = ""; // 기존 페이지 버튼 초기화

    // 시작 페이지와 끝 페이지 계산
    let startPage = Math.max(currentPage - 5, 1);
    let endPage = Math.min(startPage + 9, totalPages);
    // 이전 버튼
    if (currentPage > 1) {
      const prevButton = document.createElement("button");
      prevButton.textContent = "이전";
      prevButton.addEventListener("click", () =>
        requesthairPage(currentPage - 1)
      );
      pageContainer.appendChild(prevButton);
      prevButton.classList.add("prev-btn");
    }
    // 페이지 버튼 생성
    for (let i = startPage; i <= endPage; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.addEventListener("click", () => requesthairPage(i));
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
      nextButton.addEventListener("click", () =>
        requesthairPage(currentPage + 1)
      );
      pageContainer.appendChild(nextButton);
      nextButton.classList.add("next-btn");
    }
  };
  // 페이지 데이터 요청 함수
  const requesthairPage = (page) => {
    fetch("../json/cafe.json")
      .then((response) => response.json())
      .then((data) => {
        let hair = [];
        data?.forEach((item) => {
          item.CTGRY_THREE_NM?.includes("미용") && hair.push(item);
        });
        console.log("미용", hair);

        // 요청할 페이지의 데이터 가져오기
        const startIndex = (page - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        const pageData = hair.slice(startIndex, endIndex);

        // 페이지 버튼 재렌더링 및 데이터 렌더링
        renderhairPageButtons(Math.ceil(hair.length / PAGE_SIZE), page);
        renderhairData(pageData);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 도중 에러가 발생했습니다:", error);
      });
  };
  // 병원&약국 데이터 렌더링 함수
  const renderhairData = (data) => {
    const content = document.querySelector(".content");
    content.innerHTML = ""; // 기존 병원&약국 데이터 초기화
    // 병원&약국 디테일
    data.forEach((item) => {
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
      type.innerHTML = `<p class="title" style="font-size: 1.5rem; ">종류</p> ${item.FCLTY_INFO_DC}`;
      address.innerHTML = `<p style="font-size: 1.5rem; display: flex; align-items: center;"><img src="./images/map.png" alt="" />주소</p> ${item.LNM_ADDR}`;
      facility.innerHTML = `<p style="font-size: 1.5rem; ">시설정보설명</p> ${item.FCLTY_INFO_DC}`;
      open.innerHTML = `<p style="font-size: 1.5rem; display: flex; align-items: center; "><img src="./images/open.png" alt="" />영업시간</p> ${item.OPER_TIME}`;
      closed.innerHTML = `<p style="font-size: 1.5rem; display: flex; align-items: center; "><img src="./images/closed.png" alt="" />휴무일</p> ${item.RSTDE_GUID_CN}`;
      // date.textContent = `<p style="font-size: 1.5rem; ">기타정보</p> ${item.pet_info_cn}`;

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
  };

  // 병원&약국 데이터
  const hospitalData = () => {
    fetch("../json/cafe.json")
      .then((response) => response.json())
      .then((data) => {
        let hospital = [];
        data?.forEach((item) => {
          item.CTGRY_TWO_NM?.includes("반려의료") && hospital.push(item);
        });
        console.log("병원&약국", hospital);
        const totalPages = Math.ceil(hospital.length / PAGE_SIZE); // 전체 페이지 수 계산
        renderhospitalPageButtons(totalPages, 1); // 페이지 버튼 렌더링
        renderhospitalData(hospital.slice(0, PAGE_SIZE)); // 초기 페이지 데이터 렌더링
        // 타이틀과 디테일 텍스트 추가
        const title = document.createElement("div");
        title.textContent = "병원&약국";
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
  const renderhospitalPageButtons = (totalPages, currentPage) => {
    const pageContainer = document.querySelector(".page-container");
    pageContainer.innerHTML = ""; // 기존 페이지 버튼 초기화

    // 시작 페이지와 끝 페이지 계산
    let startPage = Math.max(currentPage - 5, 1);
    let endPage = Math.min(startPage + 9, totalPages);
    // 이전 버튼
    if (currentPage > 1) {
      const prevButton = document.createElement("button");
      prevButton.textContent = "이전";
      prevButton.addEventListener("click", () =>
        requesthospitalPage(currentPage - 1)
      );
      pageContainer.appendChild(prevButton);
      prevButton.classList.add("prev-btn");
    }
    // 페이지 버튼 생성
    for (let i = startPage; i <= endPage; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.addEventListener("click", () => requesthospitalPage(i));
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
      nextButton.addEventListener("click", () =>
        requesthospitalPage(currentPage + 1)
      );
      pageContainer.appendChild(nextButton);
      nextButton.classList.add("next-btn");
    }
  };
  // 페이지 데이터 요청 함수
  const requesthospitalPage = (page) => {
    fetch("../json/cafe.json")
      .then((response) => response.json())
      .then((data) => {
        let hospital = [];
        data?.forEach((item) => {
          item.CTGRY_TWO_NM?.includes("반려의료") && hospital.push(item);
        });
        console.log("병원&약국", hospital);

        // 요청할 페이지의 데이터 가져오기
        const startIndex = (page - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        const pageData = hospital.slice(startIndex, endIndex);

        // 페이지 버튼 재렌더링 및 데이터 렌더링
        renderhospitalPageButtons(Math.ceil(hospital.length / PAGE_SIZE), page);
        renderhospitalData(pageData);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 도중 에러가 발생했습니다:", error);
      });
  };
  // 병원&약국 데이터 렌더링 함수
  const renderhospitalData = (data) => {
    const content = document.querySelector(".content");
    content.innerHTML = ""; // 기존 병원&약국 데이터 초기화
    // 병원&약국 디테일
    data.forEach((item) => {
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
  };
  switch (clickedDataId) {
    case "음식점":
      foodData();
      input.value = "애견동반 식당";
      break;
    case "숙소":
      input.value = "애견동반 숙소";
      hotelData();
      break;
    case "미술관":
      input.value = "애견동반 미술관";
      galleryData();
      break;
    case "카페":
      input.value = "애견동반 카페";
      cafeData();
      break;
    case "미용":
      input.value = "애견미용실";
      hairData();
      break;
    case "병원":
      input.value = "동물병원";
      hospitalData();
      break;
    default:
      console.log("");
  }
});
