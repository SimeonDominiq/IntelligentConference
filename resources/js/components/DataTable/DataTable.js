import React, { Fragment } from "react";
import Cell from "./Cell";

function DataTableBuild(props) {
    const { headings, footer } = props;

    const renderHeadingRow = (_cell, cellIndex) => {
        const { headings } = props;

        return (
            <Cell
                key={`heading-${cellIndex}`}
                content={headings[cellIndex]}
                header={true}
            />
        );
    };

    const renderFooterRow = (_cell, cellIndex) => {
        const { footer } = props;

        return (
            <Cell
                key={`footer-${cellIndex}`}
                content={footer[cellIndex]}
                header={true}
            />
        );
    };

    const theadMarkup = <tr key="heading">{headings.map(renderHeadingRow)}</tr>;
    const tfootMarkup = <tr key="footer">{footer.map(renderFooterRow)}</tr>;

    return (
        <Fragment>
            <thead>{theadMarkup}</thead>
            <tfoot>{tfootMarkup}</tfoot>
        </Fragment>
    );
}

export { DataTableBuild };
