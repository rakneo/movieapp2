import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import queryString from 'query-string';
import MovieSearchCard from './MovieSearchCard';
import {
    ReactiveBase,
    DataSearch,
    MultiDataList,
    RangeSlider,
    DateRange,
    MultiList,
    SingleRange,
    SelectedFilters,
    ReactiveList,
  } from "@appbaseio/reactivesearch";

  const drawerWidth = 300;

  const styles = theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      
    },
    drawerPaper: {
      width: drawerWidth,
      padding:'1%'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginLeft:310
    },
    toolbar: theme.mixins.toolbar,
  });

class SearchPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchQuery:'',
            responseRecieved:false,
            isLoaded:false,
            isClicked: false,
            message: "🔬Show Filters"
        }
    }

    componentWillMount(){
      const values = queryString.parse(this.props.location.search);
      this.setState({searchQuery:values.q})
    }

    advancedSearchBarHandler = (e) => {
        this.setState({searchQuery:e});
    }
    

    handleClick = () => {
        this.setState({
          isClicked: !this.state.isClicked,
          message: this.state.isClicked ? "🔬 Show Filters" : "🎬 Show Movies"
        });
      }


    render(){

        const {classes} = this.props;
        return(
        <div>  
        <ReactiveBase
        app="MovieAppFinal"
        credentials="RxIAbH9Jc:6d3a5016-5e9d-448f-bd2b-63c80b401484"
       >
        <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <div style={{marginTop:20}}/>

       
        

        <Typography variant="subtitle1" component="p">
            Filter by Release Date
        </Typography>

            <DateRange
            componentId="date-filter"
            dataField="release_date"
            className="datePicker"
            />
            <div style={{margin:10}}></div>
            <Divider/> 
        <div style={{margin:10}}></div>
        <MultiList     
            componentId="genres-list"
            dataField="genres_data.raw"
            className="genres-filter"
            size={20}
            sortBy="asc"
            queryFormat="or"
            selectAllLabel="All Genres"
            showCheckbox={true}
            showCount={true}
            showSearch={true}
            placeholder="Search for a Genre"
            react={{          
                and: [
                    "mainSearch",
                    "results",
                    "date-filter",
                    "RangeSlider",
                    "language-list",
                    "revenue-list"
                ]
            }}          
            showFilter={true}
            filterLabel="Genre"
            URLParams={false} 
            innerClass={{ 
                label: "list-item",
                input: "list-input"
            }}
        />
        <Divider/> 

        <Typography variant="subtitle1" component="p">
            Filter by Revenue Range
        </Typography>

        <SingleRange 
            componentId= "revenue-list"
            dataField= "ran_revenue"
            className= "revenue-filter"
            data={[
            { start: 0, end: 1000, label: "< 1M" },
            { start: 1000, end: 10000, label: "1M-10M" },
            { start: 10000, end: 500000, label: "10M-500M" },
            { start: 500000, end: 1000000, label: "500M-1B" },
            { start: 1000000, end: 10000000, label: "> 1B" }
            ]}
            showRadio={true}
            showFilter={true}
            filterLabel="Revenue"
            URLParams= {false}
            innerClass= {{
            label: "revenue-label",
            radio: "revenue-radio"
            }}
        />
        <Divider/> 
        <Typography variant="subtitle1" component="p">
            Filter by Ratings
        </Typography>
        <RangeSlider
            componentId="RangeSlider"
            dataField="vote_average"
            className="review-filter"
            range={{
                start: 0,
                end: 10
            }}
            rangeLabels={{
                start: "0",
                end: "10"
            }}
            react={{
                and: [
                "mainSearch",
                "results",
                "language-list",
                "date-Filter",
                "genres-list",
                "revenue-list"
                ]
            }}
            />
        <Divider/> 
        <Typography variant="subtitle1" component="p">
            Filter by Language
        </Typography>
        
        <MultiDataList
        componentId="language-list"
        dataField="original_language.raw"
        className="language-filter"
        title="language"
        size={100}
        sortBy="asc"
        queryFormat="or"
        selectAllLabel="All Languages"
        showCheckbox={true}
        showSearch={true}
        placeholder="Search for a language"
        react={{
        and: [
            "mainSearch",
            "results",
            "date-filter",
            "RangeSlider",
            "genres-list",
            "revenue-list"
        ]
        }}
        data={[
        {
            label: "English",
            value: "English"
        },
        {
            label: "Chinese",
            value: "Chinese"
        },
        {
            label: "Hindi",
            value: "Hindi"
        }
        ]}
        showFilter={true}
        filterLabel="Language"
        URLParams={false}
        innerClass={{
        label: "list-item",
        input: "list-input"
        }}
        />
        </Drawer>
        <main className={classes.content}>
        <div className={classes.toolbar} />
        
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="flex-start">
        <Grid item >
        <DataSearch 
        style={{margin:'2%'}} 
        debounce={1000}
        showClear
        value={this.state.searchQuery}
        onChange={this.advancedSearchBarHandler}          
        componentId="mainSearch"            
        dataField={["original_title.search"]}                      
        className="search-bar"            
        queryFormat="and"            
        placeholder="Search for movies..."                  
        />
        </Grid>
        <Grid item>   
            <SelectedFilters
            showClearAll={true}
            clearAllLabel="Clear filters"
            />
        </Grid>
        <Grid container
              direction="row"
              justify="center"
              alignItems="center">
        <Grid item xs={12}>      
        <ReactiveList
            className="reactive-list"
            componentId="SearchResult"
            dataField="original_title"
            stream={true}
            pagination={true}
            paginationAt="bottom"
            pages={10}
            sortBy="desc"
            size={20}
            loader="Loading Results.."
            showResultStats={true}
            innerClass = {{
                list:'MuiGrid-root MuiGrid-container MuiGrid-align-items-xs-center MuiGrid-justify-xs-center search-list'
            }}
            renderItem={(res) => {
                return (<Grid item key={res.id}>
                        <MovieSearchCard 
                            
                            id={res.id}
                            title={res.original_title}
                            year={res.release_date}
                            img={`https://image.tmdb.org/t/p/w500${res.poster_path}`}
                            rating={res.vote_average}
                        /></Grid>)
            }}
            renderResultStats={
                function(stats){
                    return (
                        <div className="search-stat">{`Showing ${stats.displayedResults} of total ${stats.numberOfResults} in ${stats.time} ms`}</div>
                    )
                }
            }
            sortOptions={[
                {
                  dataField: "revenue",
                  sortBy: "desc",
                  label: "Sort by Revenue(High to Low)"
                },
                {
                  dataField: "popularity",
                  sortBy: "desc",
                  label: "Sort by Popularity(High to Low)"
                },
                {
                  dataField: "vote_average",
                  sortBy: "desc",
                  label: "Sort by Ratings(High to Low)"
                },
                {
                  dataField: "original_title.raw",
                  sortBy: "asc",
                  label: "Sort by Title(A-Z)"
                }
              ]}
            react={{
                and: [
                  "mainSearch",
                  "RangeSlider",
                  "language-list",
                  "date-filter",
                  "genres-list",
                  "revenue-list"
                ]
              }}
        />
        </Grid>
        </Grid>
        </Grid>
        </main>  
        </ReactiveBase>
        </div>
        );
    }
}

export default withStyles(styles)(SearchPage);
