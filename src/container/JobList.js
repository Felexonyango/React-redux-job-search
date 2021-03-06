import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import AllJobs from '../components/JobList/AllJobs';
import { GetJobList } from '../redux/actions/JobActions';
import Loading from '../components/loading/Loading';
import JobSearchResult from '../components/JobList/JobSearchResult';
import SearchBar from '../components/Search/SearchBar';


const JobList = () => {
  const dispatch = useDispatch();

  const jobList = useSelector(state => state.JobList);
  const [search, setSearch] = useState([]);

  const [isSearchActive, setSearchActive] = useState(false);

  const handleDescSearch = e => {
    if (e.target.value === '') {
      setSearch([]);
      setSearchActive(false);
      return;
    }
    setSearchActive(true);
    setSearch(
      jobList.data.filter(jobFilter => {
        const jobItem = jobFilter.description;
        return jobItem.toLowerCase().includes(e.target.value.toLowerCase());
      }),
    );
  };

  const handleLocSearch = e => {
    if (e.target.value === '') {
      setSearch([]);
      setSearchActive(false);
      return;
    }
    setSearchActive(true);
    setSearch(
      jobList.data.filter(jobFilter => {
        const jobItem = jobFilter.location;
        return jobItem.toLowerCase().includes(e.target.value.toLowerCase());
      }),
    );
  };

  const FetchData = () => {
    dispatch(GetJobList());
  };
  React.useEffect(() => {
    FetchData(2);
  },);

  const ShowData = () => {
    if (jobList.loading) {
      return (
        <div>
          <h1> Loading...</h1>
          <Loading />
        </div>
      );
    }

    if (isSearchActive) {
      return <JobSearchResult search={search} />;
    }

    if (!_.isEmpty(jobList.data)) {
      return <AllJobs jobList={jobList} />;
    }

    if (jobList.errorMsg !== '') {
      return (
        <h1>
          {' '}
          {jobList.errorMsg}
        </h1>
      );
    }

    return <p> unable to get data</p>;
  };

  return (
    <div>
      <SearchBar
        handleDescSearch={handleDescSearch}
        handleLocSearch={handleLocSearch}
      />

      <CssBaseline />
      <Container>{ShowData()}</Container>
    </div>
  );
};

export default JobList;
