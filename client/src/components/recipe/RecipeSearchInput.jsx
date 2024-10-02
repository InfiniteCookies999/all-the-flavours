import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import theme from "../../theme";

const RecipeSearchInput = ({ style }) => {

  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    const getQueryParams = () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      return urlParams.get('search') || "";
    };

    const searchParam = getQueryParams();
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, []);

  const handleSearch = () => {
    if (searchTerm !== '') {
      window.location.href = "/recipes?search=" + searchTerm;
    } else {
      window.location.href = "/recipes";
    }
  };

  return (
    <>
      <div style={style} className="position-relative">
        <Form.Control type="text" style={{
            border: '1px solid gray',
            height: '2.5rem'
          }}
          className="search-input"
          placeholder="search"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
          value={searchTerm}>
        </Form.Control>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          borderTopRightRadius: '5px',
          borderBottomRightRadius: '5px',
          paddingLeft: '0.5rem',
          paddingRight: '0.5rem',
          backgroundColor: theme.colors.primary,
          borderRight: '1px solid gray',
          borderTop: '1px solid gray',
          borderBottom: '1px solid gray',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: '#424242'
        }}
        className="search-btn"
        onClick={handleSearch}>
          <i className="fas fa-magnifying-glass"></i>
        </div>
      </div>
      <style>
        {`
          .search-input {
            outline: none;
            box-shadow: none !important;
          }

          .search-input:focus {
            box-shadow: 0 0 2px gray !important;
          }

          .search-btn:hover {
            cursor: pointer;
            background-color: ${theme.colors.primaryDark} !important;
            color: black !important;
          }
        `}
      </style>
    </>
  );
};

export default RecipeSearchInput;