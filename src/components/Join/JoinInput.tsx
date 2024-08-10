interface JoinInputProps {
  placeholder: string;
  marginTop? : string;
}

const JoinInput = ({ placeholder,marginTop }: JoinInputProps) => {
  return (
    <>
      <input
        className={`rounded-lg border border-[#5ECDC7] p-2 
        focus:outline-none focus:ring-0 focus:border-[#5ECDC7] transition duration-200
        ${marginTop}
        `}
        placeholder={placeholder}
        style={{ transform: 'scale(1)', transition: 'none' }} // 클릭 시 확대 방지
      />
    </>
  );
}

export default JoinInput;
