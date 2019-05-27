import React from "react";

export default function Cell({ content, header }) {
    const cellMarkup = header ? <th>{content}</th> : <td>{content}</td>;

    return cellMarkup;
}
