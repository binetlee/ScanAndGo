import React, { useEffect, useState } from 'react';

export function TestPage1({}) {
    const [testState, setTestState] = useState(false);

    useEffect(() => {
        console.log('setting state to false again after intial render');
    }, []);

    return (
        <div className="grid isBound">
            <div>
                {'A cool first page'}
            </div>
            <div className="col__12-12 col__6-12--xs col__6-12--sm col__6-12--md col__6-12--lg col__6-12--xl col__6-12--xxl">
                <div>
                    {`State: ${testState?'true': 'false'}`}
                </div>

                {/* Button */}
                <button 
                className="bttn--primary"
                onClick={()=>{setTestState(!testState)}}>
                   <span class="bttn__content">Change State</span> 
                </button>

                {/* Dropdown */}
                <div class="col__12-12 col__12-12--xs col__4-12--sm col__4-12--md col__4-12--lg col__4-12--xl col__4-12--xxl">
                  <div class="clearfix">
                    <span class="drop-down__label">Sort By:</span>
                    <form>
                    <span class="drop-down__title drop-down__title--select">
                      <select class="drop-down__select" name="sortByAjax" id="sortByAjax">

                          <option value="None">
                            Best Match
                          </option>

                          <option value="P_Topseller_Sort|1">
                            Top Sellers
                          </option>

                          <option value="P_REP_PRC_MODE|0">
                            Price Low to High
                          </option>

                          <option value="P_REP_PRC_MODE|1">
                            Price High to Low
                          </option>

                          <option value="P_Top_Rated_Sort|1" selected="">
                            Top Rated Products
                          </option>

                      </select>
                    </span>
                    </form>
                  </div>
                </div>

            </div>
        </div>
    )
}

export default TestPage1;