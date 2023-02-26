import React from 'react';

const EntryItemComp = ({entry}) => {

    return (
        <div className={"card p-3 shadow"}>
            {entry.word}
        </div>
    );
};

export default EntryItemComp;
