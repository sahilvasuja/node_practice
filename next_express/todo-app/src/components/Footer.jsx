

export const Footer=()=>{
    const all=()=>{

    }
    const active=()=>{

    }
    const completed=()=>{

    }
    const clearCompleted=()=>{

    }
    return(
        <>
         
         <div id="foot">
            <div id="footer">
                <p id="count"> items left</p>
                    <div id="filter">
                        <p id="all" onClick={all}>All</p>
                        <p id="active" onClick={active}>Active</p>
                        <p id="completed" onClick={completed}>Completed</p>
                    </div>
                <p id="clear" onClick={clearCompleted}>Clear Completed</p>
            </div>
        </div>
        </>
    )
}