//Рассчет Японских чисел--------------------------------------------

import React, {useState} from "react";
import styles from '../Components/Japaneese.module.css'

type ResultObjectType = {
    start: 0 | number
    result: 0 | number
    difference: 0 | number
}

export const Japaneese = React.memo(() => {

    let [result, setResult] = useState(0)
    let [resultObject, setResultObject] = useState({
        start: 0,
        result: 0,
        difference: 0
    })

    let start = 0

    const onResultButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        function japaneeseNumbers(minN = 0, maxN = 1): ResultObjectType {
            function getRandomIntInclusive(min: number, max: number) {
                const minCeiled = Math.ceil(min);
                const maxFloored = Math.floor(max);
                return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
            }

            start = result
            let r

            do {
                r = getRandomIntInclusive(0, 4)
            } while (r == start);

            setResult(r)
            let difference = r - start
            console.log('start ' + start + ' результат ' + r + ' разница ' + difference)
            return {
                start: start,
                result: r,
                difference: difference
            }
        }

        setResultObject(japaneeseNumbers(0, 4))

        //разобраться с классами в css? чтоб нетбыло дублирования

        //setInterval(() => setResultObject(japaneeseNumbers(0, 4)), 500)
    }
// --------------------------------------------Рассчет Японских чисел

    return <>
        <button onClick={onResultButtonClickHandler}>рассчитать</button>
        <BonesBox bonesPosition={resultObject.result}/>
    </>
})
type BonesBoxType = { bonesPosition: number }

export const BonesBox = React.memo((props: BonesBoxType = {bonesPosition: 4}) => {
    let res = [];
    for (let i = 1; i <= 4; i++) {
        if (i <= props.bonesPosition) {

            res.push(<Bone classN={styles.up} number={i}/>)
        } else {

            res.push(<Bone classN={styles.down} number={i}/>)
        }
    }

    return <div className={styles.box}>
        <span>{res}</span>
    </div>
})

export const Bone = React.memo((props: any) => {
    return <div className={props.classN}>{props.number}</div>
})

