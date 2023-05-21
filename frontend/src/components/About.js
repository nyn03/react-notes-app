import React, {useContext} from "react";
import noteContext from "../context/notes/NoteContext";

const About = () => {

    const contextValue = useContext(noteContext)

    return (
        <div>
            About - {contextValue.name} and {contextValue.age}
        </div>
    )
}

export default About;