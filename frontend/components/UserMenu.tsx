import Link from "next/link"

export default function Footer() {
return (
    <div className="absolute top-full right-0 mt-2 w-48 shadow-lg rounded z-50">
      <ul className="p-2">
        <li>로그인</li>
        <li>주문 내역 확인</li>
        <li>회원 정보 수정</li>
      </ul>
    </div>
    )
}
