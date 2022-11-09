import React, {useEffect, useState} from 'react'
import {useParams} from "react-router";
// COMPONENTS
import Dropzone from "../components/dropzone";
import {defaultPostRequest, ConvertToPercentage, cropFileName} from "../static/functions";
import RangeFilter from "../components/range-filter";

const Type = () => {
    // get parameter
    const {slug} = useParams();

    // image props
    const [image, setImage] = useState()
    const [initialImageSizes, setInitialImageSizes] = useState({width: 0, height: 0})
    const [imageSizes, setImageSizes] = useState({width: 0, height: 0})
    const [aspectRatioFlag, setAspectRatioFlag] = useState(false)
    const [percentage, setPercentage] = useState(100)
    const [aspectRatio, setAspectRatio] = useState(0)
    const [filter, setFilter] = useState(0)

    // handler props
    const [processStart, setProcessStart] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // request props
    const [formData, setFormData] = useState(null)
    const [name, setName] = useState('')

    //slider
    const [filterAmount, setFilterAmount] = useState(0);
    const [displayFilterAmount, setDisplayFilterAmount] = useState(false);


    // request to API
    async function startProcess() {

        // this error check should be here
        // let user enter 0 for size
        // but do not start the process
        if(!checkZeroSizes()){
            return
        }
        
        setIsLoading(true)
        let newFormData = new FormData();
        let croppedName = cropFileName(formData['name'])
        setName(croppedName)
        newFormData.append(`file`, formData);
        newFormData.append("fileName", croppedName);
        newFormData.append("filter", parseInt(filter));
        newFormData.append("width", imageSizes.width);
        newFormData.append("height", imageSizes.height);
        newFormData.append("filterAmount", ConvertToPercentage(filterAmount));
        newFormData.append("outputType", slug);

        const createImageResponse = await defaultPostRequest(
            process.env.REACT_APP_API + `/api/Main/ProcessImage`,
            newFormData
        );
        if (createImageResponse.status === 200) {
            setImage(createImageResponse.data.byteArray)
            setIsLoading(false)
        } else {
            setErrorMessage(createImageResponse.error)
            setIsLoading(false)
        }
    }

    // handle filters data 
    function handleDisplayFilterValue(e) {
        let tempFilter = filters.find(c => c.value == e.target.value)
        setFilterAmount(0)
        // check if filter accepts amount
        if (tempFilter.canHaveFilterAmount) {
            setDisplayFilterAmount(true)
        } else {
            setDisplayFilterAmount(false)
        }
    }

    // handle percentage values
    function checkZeroSizes() {
        if (imageSizes.width == 0 || imageSizes.height == 0) {
            setErrorMessage("Please enter positive value")
            return false
        } 
        return true
    }

    // set resize parameters
    function handleResizeCalculations(width, height, percentage) {
        if (width) {
            setImageSizes({
                width: width,
                height: aspectRatioFlag ? (width * aspectRatio).toFixed(0) : imageSizes.height
            })
        } else if (height) {
            setImageSizes({
                width: aspectRatioFlag ? (height * aspectRatio).toFixed(0) : imageSizes.width,
                height: height
            })
        } else if (percentage && aspectRatioFlag) {
            let percentageWidth = Math.round((initialImageSizes.width * percentage) / 100)
            let percentageHeight = Math.round((initialImageSizes.height * percentage) / 100)
            setImageSizes({
                width: percentageWidth,
                height: percentageHeight
            })
        }
    }

    // on any resize
    // this hook will return necessary error messages
    // as a side effect
    useEffect(() => {
        if (imageSizes.width > 3000 || imageSizes.height > 3000) {
            // block process button
            setProcessStart(false)
            setErrorMessage("You are allowed to convert maximum 3000 pixel")
        } else if (imageSizes.width < 0 || imageSizes.height < 0) {
            // block process button
            setProcessStart(false)
            setErrorMessage("Please enter positive value")
        } else if (image) {
            // release block
            setErrorMessage("")
            setProcessStart(true)
        }
    }, [imageSizes, setImageSizes])


    // clear error message after 5 seconds
    useEffect(() => {
        if (errorMessage){
            setTimeout(() => {
                setErrorMessage('')
            },5000)
        }
    }, [errorMessage,setErrorMessage]);

    return (
        <div className='container'>
            <div className="row m-5">
                <div className="col-md-12">
                    <h3 className="text-center">
                        Convert To .{slug}
                    </h3>
                </div>
            </div>

            <div className="row m-auto">
                <div className="col-md-8">
                    <div className="m-auto d-flex justify-content-center">
                        <button className="btn btn-success process-button"
                                onClick={() => {
                                    startProcess()
                                }}
                                disabled={!processStart}>
                            Process Image
                        </button>
                    </div>
                    <Dropzone
                        setFormData={setFormData}
                        image={image}
                        setImage={setImage}
                        slug={slug}
                        setImageSizes={setImageSizes}
                        setInitialImageSizes={setInitialImageSizes}
                        setAspectRatio={setAspectRatio}
                        setProcessStart={setProcessStart}
                        isLoading={isLoading}
                        name={name}
                    />
                </div>
                <div className="col-md-4">
                    <span style={{color: 'red'}}>{errorMessage && errorMessage}</span>
                    <select className="form-select"
                            aria-label="Default select example"
                            onChange={(e) => {
                                setFilter(e.target.value)
                                handleDisplayFilterValue(e)
                            }}>
                        {filters.map((item, i) => {
                            return (
                                <option key={i} value={item.value}>
                                    {item.label}
                                </option>
                            )
                        })}
                    </select>
                    <div>
                        {
                            displayFilterAmount &&
                            <RangeFilter filterAmount={filterAmount}
                                         setFilterAmount={setFilterAmount}
                            />
                        }
                    </div>
                    <div className="row m-2">
                        <div className="col-md-6">
                            <label htmlFor="width" className="form-label">Width</label>
                            <input type="number"
                                   id="width"
                                   value={imageSizes.width}
                                   className="form-control"
                                   disabled={!imageSizes.width}
                                   onChange={(e) => {
                                       handleResizeCalculations(e.target.value, null, null)
                                   }}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="height" className="form-label">Height</label>
                            <input type="number"
                                   id="height"
                                   value={imageSizes.height}
                                   disabled={!imageSizes.height}
                                   className="form-control"
                                   onChange={(e) => {
                                       handleResizeCalculations(null, e.target.value, null)
                                   }}/>
                        </div>
                    </div>

                    <div className="row m-2">
                        <div className="form-check col-md-12 m-4">
                            <input className="form-check-input"
                                   type="checkbox"
                                   onChange={(e) => {
                                       setAspectRatioFlag(e.target.checked)
                                   }}
                                   value={aspectRatioFlag}
                                   id="maintain-aspect-ratio"
                            />
                            <label className="form-check-label" htmlFor="maintain-aspect-ratio">
                                Maintain Aspect Ratio
                            </label>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="percentage" className="form-label">Percentage</label>
                            <input type="number"
                                   id="percentage"
                                   value={percentage}
                                   disabled={!aspectRatioFlag}
                                   onChange={(e) => {
                                       setPercentage(e.target.value)
                                       handleResizeCalculations(null, null, e.target.value)
                                   }}
                                   className="form-control"
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Type


// filter types with flags
const filters = [
    {label: 'None', value: 0, canHaveFilterAmount: false},
    {label: 'BlackAndWhite', value: 1, canHaveFilterAmount: false},
    {label: 'Brightness', value: 2, canHaveFilterAmount: true},
    {label: 'Contrast', value: 3, canHaveFilterAmount: true},
    {label: 'Grayscale', value: 4, canHaveFilterAmount: true},
    {label: 'Hue', value: 5, canHaveFilterAmount: true},
    {label: 'Invert', value: 6, canHaveFilterAmount: false},
    {label: 'Kodachrome', value: 7, canHaveFilterAmount: false},
    {label: 'Lightness', value: 8, canHaveFilterAmount: true},
    {label: 'Lomograph', value: 9, canHaveFilterAmount: false},
    {label: 'Opacity', value: 10, canHaveFilterAmount: true},
    {label: 'Polaroid', value: 11, canHaveFilterAmount: false},
    {label: 'Saturate', value: 12, canHaveFilterAmount: true},
    {label: 'Sepia', value: 13, canHaveFilterAmount: true},
]