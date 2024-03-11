import { timeFormat } from "../lib/timeFormat.js";

// 페이지 버튼 생성
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
// 페이지 번호를 클릭했을 때 데이터를 요청하는 함수
const requestPage = async (page) => {
    try {
        const response = await fetch(`http://localhost:3000/board?page=${page}`);
        const data = await response.json();
        // console.log(data);
        renderData(data);
        btnOn(page);
    } catch (error) {
        console.error(error);
    }
};
// 서버로부터 받은 데이터를 화면에 렌더링하는 함수
const renderData = (data) => {
    const listNumDiv = document.querySelector(".content-num");
    const listTitleDiv = document.querySelector(".content-title");
    const listWriterDiv = document.querySelector(".content-writer");
    const listDateDiv = document.querySelector(".content-date");

     // 이전에 생성된 데이터 제거
    listNumDiv.innerHTML = "";
    listTitleDiv.innerHTML = "";
    listWriterDiv.innerHTML = "";
    listDateDiv.innerHTML = "";

    data?.data?.forEach((item) => {
        const listNum = document.createElement("p");
        const listTitle = document.createElement("p");
        const listWriter = document.createElement("p");
        const listDate = document.createElement("p");

        listNum.textContent = item.boardNumber;
        listTitle.innerHTML = `<a href="detail.html?dataId=${item._id}">${item.title}</a>`;
        listWriter.textContent = item.writer;
        listDate.textContent = timeFormat(item.createdAt).substring(0, 10);

        listNumDiv.appendChild(listNum);
        listTitleDiv.appendChild(listTitle);
        listWriterDiv.appendChild(listWriter);
        listDateDiv.appendChild(listDate);
    });
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

// 초기 페이지 로드 시 첫 번째 페이지 데이터 요청
const list = async () => {
    try {
        const response = await fetch('http://localhost:3000/board');
        const data = await response.json();
        // console.log(data);
        renderData(data);

        // 전체 데이터의 갯수를 이용하여 페이지 버튼 생성
        const totalPages = Math.ceil(data?.total / 10); // 10은 한 페이지에 보여줄 게시글의 수
        createPageBtn(totalPages);
    } catch (error) {
        console.error(error);
    }
};

list();