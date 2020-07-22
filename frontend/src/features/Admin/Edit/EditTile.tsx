import React, {useState} from "react";
import {Button, Input} from "antd";

interface EditTileProps {
    name: string,
    id: number
}

const EditTile = ({name}: EditTileProps) => {

    const [editing, setEditing] = useState<boolean>(false);
    const [editName, setEditName] = useState<string>(name);

    return (
        <div>
            {editing ?
                <>
                    <Input
                        value={editName}
                        onChange={value => setEditName(value.target.value)}
                    />
                    <Button>
                        Confirm
                    </Button>
                    <Button
                        onClick={() => {setEditName(name); setEditing(false)}}
                    >
                        Cancel
                    </Button>
                </> :
                <>
                    {editName}
                    <Button
                        onClick={() => setEditing(true)}
                    >
                        Edit
                    </Button>
                </>
            }
        </div>
    );
};

export default EditTile;
