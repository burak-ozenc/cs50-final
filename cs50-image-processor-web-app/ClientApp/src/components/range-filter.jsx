import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const RangeSlider = ({filterAmount ,setFilterAmount,handlePercentage}) => {

    return (
        <div>
            <label htmlFor="range-slider" className="form-label m-2">Filter Amount</label>
            <b> {filterAmount && filterAmount}</b>
            <Slider
                name="range-slider"
                id="range-slider"
                value={filterAmount}
                onChange={(e) => {
                    setFilterAmount(e)
                }}
            />
        </div>
    );

}
export default RangeSlider