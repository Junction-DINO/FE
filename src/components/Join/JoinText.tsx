interface JoinTextProps {
    text : string;
    align : string;
    marginTop? : string;
    marginBottom? : string;
  }

const JoinText = ({text,align,marginTop,marginBottom} : JoinTextProps) => {
    return (
        <>
            <p className={`text-customBrown text-size24 ${align} ${marginTop} ${marginBottom} font-semibold leading-6`}>{text}</p>
        </>
    )
}

export default JoinText;