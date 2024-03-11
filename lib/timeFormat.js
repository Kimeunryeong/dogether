export function timeFormat(date) {
    const event = new Date(date);
    // 날짜 부분 추출
    const year = event.getFullYear();
    const month = String(event.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고, 두 자리수로 표시하고 싶으므로 padStart로 처리
    const day = String(event.getDate()).padStart(2, '0'); // 일은 두 자리수로 표시하고 싶으므로 padStart로 처리

    // 시간 부분 추출
    const hours = String(event.getHours()).padStart(2, '0');
    const minutes = String(event.getMinutes()).padStart(2, '0');
    const seconds = String(event.getSeconds()).padStart(2, '0');

    // 조합하여 반환
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}