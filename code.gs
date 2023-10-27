
function fearFinder(summonerName, apiKey, queueNum) {
  var answer = []
  var api_key = apiKey
  var summonerNameEncoded = encodeURI(summonerName)
  var puuidString = JSON.parse(UrlFetchApp.fetch("https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + summonerNameEncoded + "?api_key=" + api_key).toString()).puuid
  var matchList = JSON.parse(UrlFetchApp.fetch("https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuidString + "/ids?queue="+ queueNum +"&start=0&count=30&api_key=" + api_key).toString())
  var pointer = 0
  for (matchId of matchList) {
    var matchString = JSON.parse(UrlFetchApp.fetch("https://americas.api.riotgames.com/lol/match/v5/matches/" + matchId + "?api_key=" + api_key).toString());
    var participants = matchString.metadata.participants
    var partIndex = participants.indexOf(puuidString)
    console.log(partIndex)
    var stuff = []
    var i = partIndex < 5 ? 0 : 1
    for (var j = 0; j < 5; j++) {
      answer[pointer*5+j] = matchString.info.teams[i].bans[j].championId
    }
    pointer = pointer + 1;
  }
  return answer

}

function getClashDate(apiKey){
  var answer = []
  counter = 0
  var api_key = apiKey
  var clashList = JSON.parse(UrlFetchApp.fetch("https://na1.api.riotgames.com/lol/clash/v1/tournaments?api_key="+api_key).toString())
  for(clash of clashList){
    answer[counter] = clash.schedule[0].startTime
    counter++;
  }
  
  return answer
}