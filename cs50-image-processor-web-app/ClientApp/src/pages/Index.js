import React from "react";
import '../assets/css/style.css'
import {Link} from "react-router-dom";


const Index = () => {
    // extension types
    const conversionTypes = [
        {name: 'Bmp', value: 1, slug: 'bmp', description: 'Convert to Bmp'},
        {name: 'Jpeg', value: 2, slug: 'jpeg', description: 'Convert to Jpeg'},
        {name: 'Png', value: 3, slug: 'png', description: 'Convert to Png'},
        {name: 'WebP', value: 4, slug: 'webp', description: 'Convert to WebP'}
    ]

    return (
        <div className="main-container">
            <div className="heading">
                <h1 className="heading-title">
                    CS50 Final Project - Image Processor
                </h1>
                <h2 className="heading-credits">
                    Select an output format
                </h2>
            </div>
            <div className="cards">
                {conversionTypes.map((item, i) => {
                    return (
                        <div className="card" key={i}>
                            <Link to={`/convert-to/${item.slug}`} className="card-link ">
                                <h2 className="card-title">{item.name}</h2>
                                <p className="card-desc">{item.description}</p>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Index;
