import React, { Component ,Fragment} from 'react'
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

import LaunchItem from './LaunchItem';
import MissionKey from './MissionKey'
const LAUNCHES_QUERY=gql`

query LaunchesQuery{
    launches{
        flight_number
        mission_name
        launch_success
        launch_year
        launch_date_local
    }
}

`
export class Launches extends Component {
  render() {
    return (
      <Fragment>
        <h1 className="display-4 mb-3">Launches</h1>
        <MissionKey/>
        <Query query={LAUNCHES_QUERY}>
        {
          ({loading,error,data})=>{
            if(loading){
              return <h4>Loading....</h4>
            }
            if(error){
              console.log(error);

            }


            return <Fragment>

              {
                data.launches.map(launch=>(

                  <LaunchItem key={launch.flight_number} data={launch}/>
                ))
              }
            </Fragment>
          }
        }

        </Query>

      </Fragment>
    )
  }
}
export default Launches
