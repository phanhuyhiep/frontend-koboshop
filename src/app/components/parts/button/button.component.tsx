import { css } from "@emotion/react"
import { FC } from "react"
interface IButton {
    title?: String
    handleColor?: any
    className?: any
    onClick?: any
    type?:any
}
const ButtonComponent: FC<IButton> = ({ title, handleColor, className, onClick, type }) => {
    return (
        <button css={cssButotn(handleColor)} type={type} className={className} onClick={onClick}>{title}</button>
    )
}

export default ButtonComponent
const cssButotn = (handleColor: any) => css`
    
    text-decoration: none;
    display: inline-block;
    border: 1px solid #fff;
    padding:5px 0px;
    color: #fff;
    ${handleColor ? (`background:#BF0000`) : (`background:#595959`)}
`