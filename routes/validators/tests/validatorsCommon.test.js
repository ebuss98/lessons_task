import {DateValidation, IsPositiveNumber, NumberArrayValidation} from "../validatorsCommon.js";

it('IsPositiveNumber should return undefined (success)', function () {
    let expectedResult = undefined;
    let result = IsPositiveNumber('4');
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
})

it('IsPositiveNumber should return error because of negative number', function () {
    let expectedResult = 'Wrong input: must be positive Number';
    let result = IsPositiveNumber('-4');
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
})

it('IsPositiveNumber should return error because of failed parse', function () {
    let expectedResult = 'Wrong input: must be positive Number';
    let result = IsPositiveNumber('1test');
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
})

it('NumberArrayValidation should return undefined (success)', function () {
    let expectedResult = undefined;
    let result = NumberArrayValidation([1,4,3,1]);
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
})

it('NumberArrayValidation should return undefined (success)', function () {
    let expectedResult = undefined;
    let result = NumberArrayValidation([]);
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
})

it('NumberArrayValidation should return error (negative numbers)', function () {
    let expectedResult = 'Wrong array input: elements must be positive Number';
    let result = NumberArrayValidation([1,-4,3,1]);
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
})

it('NumberArrayValidation should return error (not numbers)', function () {
    let expectedResult = 'Wrong array input: elements must be Number';
    let result = NumberArrayValidation([1,"4",3,1]);
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
})

it('DateValidation should return undefined (success)', function () {
    let expectedResult = undefined;
    let result = DateValidation('2019-05-15');
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
})

it('DateValidation should return error', function () {
    let expectedResult = 'Wrong date input';
    let result = DateValidation('2019-05-155');
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
})

it('DateValidation should return error', function () {
    let expectedResult = 'Wrong date input';
    let result = DateValidation('2019-05-af');
    if(result !== expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
})

it('DateValidation should return error', function () {
    let expectedResult = 'Wrong date input';
    let result = DateValidation('2019.05.12');
    if(result !== expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
})