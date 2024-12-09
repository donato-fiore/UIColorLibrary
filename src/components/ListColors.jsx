import React from 'react';
import UIColors from '../static/Colors';

import { Toaster } from 'sonner';
import { useState } from 'react';
import { CCollapse } from '@coreui/react';

import { copyColor, getTextColor, displayColor } from '../Utils';

import './ListColors.css';
import "bootstrap-icons/font/bootstrap-icons.css";

const ListColors = () => {
    const [darkModeVisible, setDarkModeVisible] = useState(true);
    const [lightModeVisible, setLightModeVisible] = useState(true);
    const [unifiedColorsVisible, setUnifiedColorsVisible] = useState(true);

    const categories = {
        darkColors: "🌑 Dark Mode",
        lightColors: "☀️ Light Mode",
        unifiedColors: "🌈 Unified Colors"
    };

    return (
        <div className="mt-3 color-container">
            <Toaster richColors />
            {Object.entries(UIColors).map(([category, colors]) => {
                const isVisible =
                    category === 'darkColors'
                        ? darkModeVisible
                        : category === 'lightColors'
                            ? lightModeVisible
                            : unifiedColorsVisible;

                return (
                    <div
                        key={category}
                        className={`color-category ${isVisible ? 'expanded' : 'collapsed'}`}
                    >
                        <div
                            onClick={() => {
                                if (category === 'darkColors') {
                                    setDarkModeVisible(!darkModeVisible);
                                } else if (category === 'lightColors') {
                                    setLightModeVisible(!lightModeVisible);
                                } else {
                                    setUnifiedColorsVisible(!unifiedColorsVisible);
                                }
                            }}
                            className="category-header"
                        >
                            <h2 className="category-title">
                                <i
                                    className={`bi ${isVisible ? 'bi-caret-down-fill' : 'bi-caret-right-fill'
                                        }`}
                                ></i>
                                {categories[category]}
                            </h2>
                        </div>

                        <CCollapse visible={isVisible}>
                            <div className="color-list">
                                {Object.entries(colors).map(([colorName, colorValue]) => (
                                    <div
                                        key={colorName}
                                        className="color-item"
                                        style={{
                                            backgroundColor: colorValue,
                                            color: getTextColor(colorValue),
                                        }}
                                    >
                                        <div className="color-info">
                                            <span
                                                className="color-name"
                                                data-full-name={colorName}
                                            >
                                                {colorName}
                                            </span>
                                            <div
                                                className="color-value-container"
                                                onClick={() => copyColor(colorValue)}
                                            >
                                                <span
                                                    className="color-value"
                                                    style={{
                                                        color: getTextColor(colorValue),
                                                    }}
                                                >
                                                    {displayColor(colorValue)}
                                                    <button className="btn-transparent">
                                                        <i className="bi bi-copy"></i>
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CCollapse>
                    </div>
                );
            })}

        </div>
    );
};

export default ListColors;