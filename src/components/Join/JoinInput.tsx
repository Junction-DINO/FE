interface JoinInputProps {
  placeholder: string;
  marginTop? : string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 상태 변경 처리
}

const JoinInput = ({ placeholder,marginTop,value,onChange }: JoinInputProps) => {
  return (
    <>
      <input
        className={`rounded-lg border border-[#5ECDC7] p-2 w-full
        focus:outline-none focus:ring-0 focus:border-[#5ECDC7] transition duration-200
        ${marginTop}
        `}
        placeholder={placeholder}
        style={{ transform: 'scale(1)', transition: 'none' }} // 클릭 시 확대 방지
        value={value} // 상태를 value로 설정
        onChange={onChange} // 상태 변경 처리
      />
    </>
  );
}

export default JoinInput;
