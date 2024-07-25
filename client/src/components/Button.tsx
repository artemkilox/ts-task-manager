import React, {FC, useState} from 'react';

interface Props{
    color: string,
    btnValue: string,
    clickHandler(): void
}

const Button: FC<Props> = ({color, btnValue, clickHandler}) => {
    const [isHover, setIsHover] = useState<boolean>(false)

    const red: string = "#f56262"
    const lightRed: string = "#ef2c2c"
    const green: string = "#67cc5b"
    const lightGreen: string = "#54dc11"
    const blue: string = "#6387ee"
    const lightBlue: string = "#2048e1"

    let mainColor: string = ""
    let secondColor: string = ""

    if(color === "red"){
        mainColor = red
        secondColor = lightRed
    } else if (color === "blue"){
        mainColor = blue
        secondColor = lightBlue
    } else if (color === "green"){
        mainColor = green
        secondColor = lightGreen
    } else {
        mainColor = blue
        secondColor = lightBlue
    }

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const btnStyle = {
        background: isHover ? secondColor : mainColor
    }

    return (
        <button
            type="button"
            style={btnStyle}
            className="mt-3 inline-flex w-full justify-center rounded-md px-5 py-2 text-xl font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover: sm:mt-0 sm:w-auto"
            onClick={clickHandler}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {btnValue}
        </button>
    );
}

export default Button;