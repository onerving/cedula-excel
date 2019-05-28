import React, {Component} from 'react';
import {useDropzone} from 'react-dropzone';


function BasicDropzone(props){
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone ({
        accept: '.xls,.xlsx',
        multiple: false,
        onDropAccepted: props.onDropAccepted

    });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                Arrastra tu archivo aquí, o da click para seleccionarlo.
            </div>
            <aside>
                <ul>{files}</ul>
            </aside>
        </section>
    );
}

export default BasicDropzone;