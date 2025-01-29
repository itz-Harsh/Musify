import "./Toggle.css";

const Toggle = ({ handleChange , isChecked}) =>  {
    return (
        <div className="toggle-container">
            <input 
            type="checkbox" 
            id="check"
            className="toggle"
            onChange={handleChange}
            checked={isChecked} />
        </div>
    )
};
export default Toggle;