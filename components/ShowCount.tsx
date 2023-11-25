import CopyToClipboardButton from "./CopyToClipboardButton";

const countKeys = (headersAndScores: { [headers: string]: string }): { [scores: string]: number } => {
  const headers = Object.keys(headersAndScores);

  let uniqueScoreCount: {[key: string]: number} = {

  }

  // These are the scores
  for (let i = 0; i < headers.length; i++) {
    const score = headersAndScores[headers[i]]
    if(uniqueScoreCount[score] != undefined) {
      uniqueScoreCount[score] += 1
    } else {
      uniqueScoreCount[score] = 1 // we found the first
    }
  }


  return uniqueScoreCount;
};

function makeTextForScores(countedScores: {[score: string]: number}): string {
  const scores = Object.keys(countedScores)

  let string = ""
  scores.forEach(score => {
    string += `${score} - ${countedScores[score]}`
    string += `\n`;
  })

  return string
}

export default function ShowCount({headersAndScores}: {headersAndScores: { [key: string]: string }}) {
  const count = countKeys(headersAndScores)
  const scores = Object.keys(count)

  return <div>
    <CopyToClipboardButton text={makeTextForScores(count)} />
    {
      scores.map(score => <div>{score} - {count[score]}</div>)
    }
  </div>
}

