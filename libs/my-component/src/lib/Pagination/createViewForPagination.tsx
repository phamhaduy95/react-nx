import { Pagination3dot } from './Pagination3dot';
import PaginationItem from './PaginationItem';
const threeDot = Pagination3dot;

/**
 * As the pagination index can be very large (for example 100). Its is not feasible to have all
 * numbers of pagination on the view for user. The method will transform the full-size number array
 * into shorter format. the view format has three possible transformations which are based on the
 * value of active index.
 *
 * For example, if the maximum pagination number is 10 then it will generate the view like below:
 * - when active  index is below 5 then {1 2 3 4 5 ... 9 10}
 * - when active index is greater than 7 then {1 2 ...6 7 8 9 10}
 * - when active index is 6 then {1 2 ... 5 6 7.. 9 10}
 *
 * However when the maximum number is small enough, the array will be represented fully on
 * the view.
 */

export default function createViewForPagination(
  maxNumber: number,
  siblingCount: number,
  boundaryCount: number,
  active: number
) {
  // maxNumber +=1;
  /** the breakpoint is the minimum number of pagination below which the pagination dont need to transform into shorter format. For example when breakpoint is 7 while maximum pagination index is 5 then we have [ 1 2 3 4 5 ] */
  let breakpoint = 2 * (siblingCount + boundaryCount) + 3;
  // 3 here means 3 pagination numbers which always be showed.These three are minimum index (0) , maximum index and the active index.

  if (maxNumber <= breakpoint) {
    return createPaginationItems(1, maxNumber);
  }

  /** pivot1 and pivot2 is two breakpoints at which the presentation of the pagination will be changed accordingly to the value of active index. */
  let pivot1 = 1 + siblingCount + boundaryCount + 1;
  let pivot2 = maxNumber - siblingCount - boundaryCount;

  /** when active index is smaller or equal to pivot1, we slit the array of pagination numbers
   * into two parts divided by the three-dot notation. The left part will be longer then the right
   * part to demonstrate that the active index is small.
   */
  if (active <= pivot1) {
    let leftPart = createPaginationItems(1, boundaryCount + siblingCount + 4);
    let rightPart = createPaginationItems(maxNumber - boundaryCount, maxNumber);
    return [...leftPart, threeDot(), ...rightPart];
  }

  /** when active index is in between the pivot1 and the pivot2, we need to slit the array of pagination numbers into three parts. Each part is separated by the three dot notation. The middle part consists of active index which is in between some adjacent sibling indices.
   */
  if (active < pivot2) {
    let leftPart = createPaginationItems(1, boundaryCount + 1);
    let rightPart = createPaginationItems(maxNumber - boundaryCount, maxNumber);
    let middlePart = createPaginationItems(
      active - siblingCount,
      active + siblingCount
    );
    return [...leftPart, threeDot(), ...middlePart, threeDot(), ...rightPart];
  }

  let rightPart = createPaginationItems(
    maxNumber - boundaryCount - siblingCount - 3,
    maxNumber
  );
  let leftPart = createPaginationItems(1, boundaryCount + 1);
  return [...leftPart, threeDot(), ...rightPart];
}

class RangeNumber {
  private max: number;
  private min: number;
  constructor(min: number, max: number) {
    this.max = max;
    this.min = min;
  }

  getArray(): number[] {
    let array = [];
    for (let number = this.min; number <= this.max; number++) {
      array.push(number);
    }
    return array;
  }
}

function createPaginationItems(min: number, max: number) {
  const rangeArray = new RangeNumber(min, max).getArray();
  return rangeArray.map((number) => {
    return <PaginationItem index={number} key={number}></PaginationItem>;
  });
}
