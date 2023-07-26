import { useState} from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

const SearchBar = () => {
    var [searchData, setSearch] = useState('');

    const app_name = 'arb-navigator-6c93ee5fc546';
    function buildPath(route)
    {
        console.log("Build Path");
        if (process.env.NODE_ENV === 'production') 
        {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else
        {        
            return 'http://localhost:5000/' + route;
        }
    }

    const doSearch = async (e) => {
        // e.preventDefault();
        console.log(searchData);
        let obj = {search:searchData};
        let js = JSON.stringify(obj);

        const response = await axios.post(buildPath('api/search'), js, {
            headers: {
            'Content-Type': 'application/json',
            }
        });
        console.log(response);
    };

    return (
       
            <form className="search">
                <input
                    className="search__input"
                    type="text"
                    id="search"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="search__button" onClick={doSearch}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
    )
}
//export default SearchBar;