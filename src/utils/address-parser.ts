// General regexes
const no = '(?: ?[#N№] ?)?'
const separators = '[,. ]'
const basicStreetName = '(?:(?:\\d+|[LMCVXI]+)[ -]{0,3})?[А-ЯЄІЇҐ](?:(?!удинок)[А-ЯЄІЇҐа-яєіїґ\'-])*(?:-\\d|\\s+"?[А-ЯЄІЇҐа-яєіїґ\'-]{2,}|\\s+[А-ЯЄІЇҐа-яєіїґ\'-]{2,}\\.(?!\\s*\\d))*'
const streetNameWithAbbreviation = '[А-ЯЄІЇҐ]{1,2}\\.\\s?[А-ЯЄІЇҐа-яєіїґ\'-]+(?:\\s+[А-ЯЄІЇҐа-яєіїґ\'-]{2,})*|[А-ЯЄІЇҐа-яєіїґ\'-]+(?:\\s+[А-ЯЄІЇҐа-яєіїґ\'-]{2,})*\\s?[А-ЯЄІЇҐ]{1,2}\\.'
const streetName = `(?<=[^А-ЯЄІЇҐа-яєіїґ]|^)"?(?<streetName>${streetNameWithAbbreviation}|${basicStreetName})"?`

// Geonims

const streetTypes = {
  isStreet: {
    streetType: 'Вулиця',
    streetTypeId: 1
  },
  isSquare: {
    streetType: 'Площа',
    streetTypeId: 2
  },
  isMaidan: {
    streetType: 'Майдан',
    streetTypeId: 3
  },
  isHighway: {
    streetType: 'Шосе',
    streetTypeId: 4
  },
  isAvenue: {
    streetType: 'Проспект',
    streetTypeId: 5
  },
  isBoulevard: {
    streetType: 'Бульвар',
    streetTypeId: 6
  },
  isAlley: {
    streetType: 'Алея',
    streetTypeId: 7
  },
  isLane: {
    streetType: 'Провулок',
    streetTypeId: 8
  },
  isPassage: {
    streetType: 'Проїзд',
    streetTypeId: 9
  },
  isDownhill: {
    streetType: 'Узвіз',
    streetTypeId: 10
  },
  isImpasse: {
    streetType: 'Тупик',
    streetTypeId: 11
  },
  isEmbankment: {
    streetType: 'Набережна',
    streetTypeId: 12
  },
  isWay: {
    streetType: 'Шлях',
    streetTypeId: 13
  },
  isRoad: {
    streetType: 'Дорога',
    streetTypeId: 14
  },
  isCheckin: {
    streetType: 'Заїзд',
    streetTypeId: 15
  },
  isEntry: {
    streetType: 'В\'їзд',
    streetTypeId: 16
  },
  isAlley2: {
    streetType: 'Завулок',
    streetTypeId: 17
  },
  isLine: {
    streetType: 'Лінія',
    streetTypeId: 18
  },
  isQuarter: {
    streetType: 'Квартал',
    streetTypeId: 101
  },
  isMicrodistrict: {
    streetType: 'Мікрорайон',
    streetTypeId: 102
  },
  isResidentialArea: {
    streetType: 'Жилий масив',
    streetTypeId: 103
  },
  isBorough: {
    streetType: 'Містечко',
    streetTypeId: 104
  },
  isTract: {
    streetType: 'Урочище',
    streetTypeId: 105
  },
  isFarmstead: {
    streetType: 'Хутір',
    streetTypeId: 106
  },
  isGardening: {
    streetType: 'Садове товариство',
    streetTypeId: 107
  },
  isGarage: {
    streetType: 'Гаражний кооператив',
    streetTypeId: 104
  },
  isOther: {
    streetType: 'Інше',
    streetTypeId: 20
  }
}

const roadSource = ['автомобільна дорога', 'автодорога', 'дорога', 'автошлях']
const roadShortSource = ['автодор', 'дор', 'а\\/дор', 'а-дор', 'а\\/ш']
const road = `(?<isRoad>${roadSource.join('|')}|${roadShortSource.join('|')})`
const roadFull = `(?<isRoad>${roadSource.join('|')})`
const roadShort = `(?<isRoad>${roadShortSource.join('|')})`

const streetSource = ['вулиця', 'вулмиця', 'вудиця', 'улиця', 'улица']
const streetShortSource = ['вул', 'вукл', 'вуд', 'ул', 'вл', 'в']
const street = `(?<isStreet>${streetSource.join('|')}|${streetShortSource.join('|')})`
const streetFull = `(?<isStreet>${streetSource.join('|')})`
const streetShort = `(?<isStreet>${streetShortSource.join('|')})`

const squareSource = ['площадь', 'сквер', 'площа']
const squareShortSource = ['площ', 'пл-дь', 'скв', 'пл']
const square = `(?<isSquare>${squareSource.join('|')}|${squareShortSource.join('|')})`
const squareFull = `(?<isSquare>${squareSource.join('|')})`
const squareShort = `(?<isSquare>${squareShortSource.join('|')})`

const maidanSource = ['майдан']
const maidanShortSource = ['майд', 'мд-н', 'мдн']
const maidan = `(?<isMaidan>${maidanSource.join('|')}|${maidanShortSource.join('|')})`
const maidanFull = `(?<isMaidan>${maidanSource.join('|')})`
const maidanShort = `(?<isMaidan>${maidanShortSource.join('|')})`

const highwaySource = ['шоссе', 'шосе']
const highwayShortSource = ['шос', 'ш']
const highway = `(?<isHighway>${highwaySource.join('|')}|${highwayShortSource.join('|')})`
const highwayFull = `(?<isHighway>${highwaySource.join('|')})`
const highwayShort = `(?<isHighway>${highwayShortSource.join('|')})`

const avenueSource = ['проспект']
const avenueShortSource = [
  'проспкт',
  'просп',
  'прос-кт',
  'прос-т',
  'пр-кт',
  'прос',
  'п-кт',
  'пр-т',
  'п-т',
  'пкт',
  'пр'
]
const avenue = `(?<isAvenue>${avenueSource.join('|')}|${avenueShortSource.join('|')})`
const avenueFull = `(?<isAvenue>${avenueSource.join('|')})`
const avenueShort = `(?<isAvenue>${avenueShortSource.join('|')})`

const boulevardSource = ['бульвар', 'бульовар']
const boulevardShortSource = [
  'бульв',
  'буль',
  'б\\.р',
  'б\\/р',
  'б\\\\р',
  'б-вар',
  'бльв',
  'б-р',
  'бул',
  'б'
]
const boulevard = `(?<isBoulevard>${boulevardSource.join('|')}|${boulevardShortSource.join('|')})`
const boulevardFull = `(?<isBoulevard>${boulevardSource.join('|')})`
const boulevardShort = `(?<isBoulevard>${boulevardShortSource.join('|')})`

const alleySource = ['аллея', 'алея']
const alleyShortSource = ['алл', 'ал']
const alley = `(?<isAlley>${alleySource.join('|')}|${alleyShortSource.join('|')})`
const alleyFull = `(?<isAlley>${alleySource.join('|')})`
const alleyShort = `(?<isAlley>${alleyShortSource.join('|')})`

const laneSource = ['переулок', 'провулок', 'првулок']
const laneShortSource = ['провул', 'пр-лок', 'переул', 'пров', 'пер']
const lane = `(?<isLane>${laneSource.join('|')}|${laneShortSource.join('|')})`
const laneFull = `(?<isLane>${laneSource.join('|')})`
const laneShort = `(?<isLane>${laneShortSource.join('|')})`

const passageSource = ['проїзд', 'проезд']
const passageShortSource = ['пр-зд', 'пр-д', 'прзд']
const passage = `(?<isPassage>${passageSource.join('|')}|${passageShortSource.join('|')})`
const passageFull = `(?<isPassage>${passageSource.join('|')})`
const passageShort = `(?<isPassage>${passageShortSource.join('|')})`

const downhillSource = ['узвіз', 'спуск']
const downhillShortSource = ['узв', 'уз', 'сп']
const downhill = `(?<isDownhill>${downhillSource.join('|')}|${downhillShortSource.join('|')})`
const downhillFull = `(?<isDownhill>${downhillSource.join('|')})`
const downhillShort = `(?<isDownhill>${downhillShortSource.join('|')})`

const impasseSource = ['тупик']
const impasseShortSource = ['туп', 'т']
const impasse = `(?<isImpasse>${impasseSource.join('|')}|${impasseShortSource.join('|')})`
const impasseFull = `(?<isImpasse>${impasseSource.join('|')})`
const impasseShort = `(?<isImpasse>${impasseShortSource.join('|')})`

const embankmentSource = ['набережная', 'набережна']
const embankmentShortSource = ['набережн', 'набереж', 'наб-жна', 'наб-на', 'наб']
const embankment = `(?<isEmbankment>${embankmentSource.join('|')}|${embankmentShortSource.join('|')})`
const embankmentFull = `(?<isEmbankment>${embankmentSource.join('|')})`
const embankmentShort = `(?<isEmbankment>${embankmentShortSource.join('|')})`

const waySource = ['шлях', 'путь']
const wayShortSource = ['шл']
const way = `(?<isWay>${waySource.join('|')}|${wayShortSource.join('|')})`
const wayFull = `(?<isWay>${waySource.join('|')})`
const wayShort = `(?<isWay>${wayShortSource.join('|')})`

const checkinSource = ['заїзд', 'заезд']
const checkinShortSource = ['за-зд', 'з-зд']
const checkin = `(?<isCheckin>${checkinSource.join('|')}|${checkinShortSource.join('|')})`
const checkinFull = `(?<isCheckin>${checkinSource.join('|')})`
const checkinShort = `(?<isCheckin>${checkinShortSource.join('|')})`

const entrySource = ['в\'їзд', 'вьезд', 'въезд']
const entryShortSource = ['в*їзд', 'в-зд']
const entry = `(?<isEntry>${entrySource.join('|')}|${entryShortSource.join('|')})`
const entryFull = `(?<isEntry>${entrySource.join('|')})`
const entryShort = `(?<isEntry>${entryShortSource.join('|')})`

const alley2Source = ['завулок', 'заулок']
const alley2ShortSource = ['завул', 'заул', 'зав']
const alley2 = `(?<isAlley2>${alley2Source.join('|')}|${alley2ShortSource.join('|')})`
const alley2Full = `(?<isAlley2>${alley2Source.join('|')})`
const alley2Short = `(?<isAlley2>${alley2ShortSource.join('|')})`

const lineSource = ['лінія', 'линия']
const lineShortSource = ['лін', 'лин']
const line = `(?<isLine>${lineSource.join('|')}|${lineShortSource.join('|')})`
const lineFull = `(?<isLine>${lineSource.join('|')})`
const lineShort = `(?<isLine>${lineShortSource.join('|')})`

const quarterSource = ['квартал']
const quarterShortSource = [
  'кварт-л',
  'квар-ал',
  'кварт',
  'кв-ал',
  'квр-л',
  'кв-л',
  'квар',
  'кв'
]
const quarter = `(?<isQuarter>${quarterSource.join('|')}|${quarterShortSource.join('|')})`
const quarterFull = `(?<isQuarter>${quarterSource.join('|')})`
const quarterShort = `(?<isQuarter>${quarterShortSource.join('|')})`

const microDistrictSource = ['мікрорайон', 'микрорайон', 'микрораен']
const microDistrictShortSource = [
  'мікрор-он',
  'мікрор-н',
  'микрор-он',
  'микрор-н',
  'м-район',
  'м\\\\р-н',
  'мкр-н',
  'мк-рн',
  'м-р-н',
  'мкрн',
  'мрн',
  'м-р',
  'м-н',
  'мр'
]
const microDistrict = `(?<isMicroDistrict>${microDistrictSource.join('|')}|${microDistrictShortSource.join('|')})`
const microDistrictFull = `(?<isMicroDistrict>${microDistrictSource.join('|')})`
const microDistrictShort = `(?<isMicroDistrict>${microDistrictShortSource.join('|')})`

const residentialAreaSource = [
  'жилищный массив',
  'жилищный масив',
  'житловий масив',
  'жилий массив',
  'жилий масив',
  'жилой массив',
  'жилой масив',
  'жилмасив'
]
const residentialAreaShortSource = ['жил\\.мас', 'ж\\/мас', 'ж\\\\мас', 'ж\\/м', 'ж\\\\м', 'ж-м']
const residentialArea = `(?<isResidentialArea>${residentialAreaSource.join('|')}|${residentialAreaShortSource.join('|')})`
const residentialAreaFull = `(?<isResidentialArea>${residentialAreaSource.join('|')})`
const residentialAreaShort = `(?<isResidentialArea>${residentialAreaShortSource.join('|')})`

const boroughSource = ['містечко', 'городок']
const borough = `(?<isBorough>${boroughSource.join('|')})`

const tractSource = ['урочище']
const tractShortSource = ['уроч', 'ур']
const tract = `(?<isTract>${tractSource.join('|')}|${tractShortSource.join('|')})`
const tractFull = `(?<isTract>${tractSource.join('|')})`
const tractShort = `(?<isTract>${tractShortSource.join('|')})`

const farmsteadSource = ['хутір', 'хутор']
const farmsteadShortSource = ['хут', 'х']
const farmstead = `(?<isFarmstead>${farmsteadSource.join('|')}|${farmsteadShortSource.join('|')})`
const farmsteadFull = `(?<isFarmstead>${farmsteadSource.join('|')})`
const farmsteadShort = `(?<isFarmstead>${farmsteadShortSource.join('|')})`

const gardeningSource = ['садове товариство']
const gardeningShortSource = ['сад\\.тов', 'с\\.тов', 'с\\.т', 'ст']
const gardening = `(?<isGardening>${gardeningSource.join('|')}|${gardeningShortSource.join('|')})`
const gardeningFull = `(?<isGardening>${gardeningSource.join('|')})`
const gardeningShort = `(?<isGardening>${gardeningShortSource.join('|')})`

const garageSource = ['гаражний кооператив']
const garageShortSource = ['гар\\.кооп', 'гар\\.к', 'гк']
const garage = `(?<isGarage>${garageSource.join('|')}|${garageShortSource.join('|')})`
const garageFull = `(?<isGarage>${garageSource.join('|')})`
const garageShort = `(?<isGarage>${garageShortSource.join('|')})`

const detourSource = ['об\'їзд']
const detourShortSource = ['об-зд', 'об']
const detour = `(?<isDetour>${detourSource.join('|')}|${detourShortSource.join('|')})`
const detourFull = `(?<isDetour>${detourSource.join('|')})`
const detourShort = `(?<isDetour>${detourShortSource.join('|')})`

const geonimTypeSource = [
  entry,
  road,
  street,
  square,
  maidan,
  highway,
  avenue,
  boulevard,
  alley,
  lane,
  passage,
  downhill,
  impasse,
  embankment,
  way,
  checkin,
  alley2,
  line,
  quarter,
  microDistrict,
  residentialArea,
  borough,
  tract,
  farmstead,
  gardening,
  garage,
  detour
]

const geonimTypeFullSource = [
  entryFull,
  roadFull,
  streetFull,
  squareFull,
  maidanFull,
  highwayFull,
  avenueFull,
  boulevardFull,
  alleyFull,
  laneFull,
  passageFull,
  downhillFull,
  impasseFull,
  embankmentFull,
  wayFull,
  checkinFull,
  alley2Full,
  lineFull,
  quarterFull,
  microDistrictFull,
  residentialAreaFull,
  borough,
  tractFull,
  farmsteadFull,
  gardeningFull,
  garageFull,
  detourFull
]

const geonimTypeShortSource = [
  entryShort,
  roadShort,
  streetShort,
  squareShort,
  maidanShort,
  highwayShort,
  avenueShort,
  boulevardShort,
  alleyShort,
  laneShort,
  passageShort,
  downhillShort,
  impasseShort,
  embankmentShort,
  wayShort,
  checkinShort,
  alley2Short,
  lineShort,
  quarterShort,
  microDistrictShort,
  residentialAreaShort,
  borough,
  tractShort,
  farmsteadShort,
  gardeningShort,
  garageShort,
  detourShort
]
export const geonimTypeSourceNoCapture = [
  entrySource.join('|'),
  roadSource.join('|'),
  roadShortSource.join('|'),
  streetSource.join('|'),
  streetShortSource.join('|'),
  squareSource.join('|'),
  squareShortSource.join('|'),
  maidanSource.join('|'),
  maidanShortSource.join('|'),
  highwaySource.join('|'),
  highwayShortSource.join('|'),
  avenueSource.join('|'),
  avenueShortSource.join('|'),
  boulevardSource.join('|'),
  boulevardShortSource.join('|'),
  alleySource.join('|'),
  alleyShortSource.join('|'),
  laneSource.join('|'),
  laneShortSource.join('|'),
  passageSource.join('|'),
  passageShortSource.join('|'),
  downhillSource.join('|'),
  downhillShortSource.join('|'),
  impasseSource.join('|'),
  impasseShortSource.join('|'),
  embankmentSource.join('|'),
  embankmentShortSource.join('|'),
  waySource.join('|'),
  wayShortSource.join('|'),
  checkinSource.join('|'),
  checkinShortSource.join('|'),
  entryShortSource.join('|'),
  alley2Source.join('|'),
  alley2ShortSource.join('|'),
  lineSource.join('|'),
  lineShortSource.join('|'),
  quarterSource.join('|'),
  quarterShortSource.join('|'),
  microDistrictSource.join('|'),
  microDistrictShortSource.join('|'),
  residentialAreaSource.join('|'),
  residentialAreaShortSource.join('|'),
  boroughSource.join('|'),
  tractSource.join('|'),
  tractShortSource.join('|'),
  farmsteadSource.join('|'),
  farmsteadShortSource.join('|'),
  gardeningSource.join('|'),
  gardeningShortSource.join('|'),
  garageSource.join('|'),
  garageShortSource.join('|'),
  detourSource.join('|'),
  detourShortSource.join('|')
]

const geonimFullType = `(?<![А-ЯЄІЇҐ])(?<streetType>${geonimTypeFullSource.join('|')})`
const geonimShortType = `(?<![А-ЯЄІЇҐ])(?<streetType>${geonimTypeShortSource.join('|')})`
export const geonim = `(?<![А-ЯЄІЇҐ])(?<streetType>${geonimTypeSource.join('|')})`

// House part

const houseSource = [
  'приміщення',
  'строение',
  'будівля',
  'будинок'
]
const houseShortSource = [
  'приміщ',
  'дом',
  'буд',
  'Д\\/К',
  'д',
  'б'
]
const house = `(?:${houseSource.join('|')}|${houseShortSource.join('|')})`
const houseFull = `(?:${houseSource.join('|')})`
const houseNumber = `${no}(?<houseNumber>Б[.\\\\/-]Н(?![А-ЯЄІЇҐ])|Н(?![А-ЯЄІЇҐ])|-{1,2}|\\d+(?:[ -]{0,}"?[А-ТІЄ](?![А-ЯЄІЇҐ])"?)?(?:[\\/\\\\]\\s?\\d+(?:"?[А-ТІЄ](?![А-ЯЄІЇҐ])"?)?)?)`

// Litera part

const literaSource = [
  'літера',
  'литера',
  'літ\\.?'
]

const litera = `(?:${literaSource.join('|')})`
const literaNumber = '"?(?<litera>[А-ТІЄ](?![А-ЯЄІЇҐ.]))"?'
const fullLitera = `(?:${separators}{0,2}${litera}\\s?${literaNumber})?`

// Block part

const blockSource = [
  'секция',
  'секція',
  'корпус'
]
const blockShortSource = [
  'секц',
  'корп',
  'сек',
  'кор'
]
const block = `(?:${blockSource.join('|')}|${blockShortSource.join('|')})`
// const blockFull = `(?:${blockSource.join('|')})`
// const blockShort = `(?:${blockShortSource.join('|')})`
const blockNumber = ('(?<block>\\d+|[А-ТІЄ](?![А-ЯЄІЇҐ.]))')
const fullBlock = `(${separators}{0,2}${block}[\\s.]{0,2}${blockNumber})`

// Apartments part

const aptSource = [
  'нежитлове приміщення',
  'нежилое помещение',
  'приміщення',
  'помещение',
  'квартира',
  'квартіра',
  'комната',
  'кімната',
  'офіс',
  'офис'
]

const aptShortSource = [
  'нежитлове приміщ',
  'неж\\.\\s?приміщ',
  'неж\\.\\s?помещ',
  'приміщ',
  'помещ',
  'кварт',
  'прим',
  'кімн',
  'н[\\.\\\\\\/]\\s?п',
  'нп',
  'оф',
  'кв',
  'вк',
  'о',
  'к'
]

const apt = `(?:${aptSource.join('|')}|(?:${aptShortSource.join('|')})[., ]{1,2})`
const aptNumber = ('(?<apartment>Н(?![А-ЯЄІЇҐ])|-{1,2}|\\d+(?:[ \\/-]{0,2}[А-Я\\d]{0,3}(?![А-ЯЄІЇҐ]))?)')
const fullApartment = `(?:${separators}{0,2}${apt}[.\\s+]{1,}${no}${aptNumber})`

// Complete address with all complete parts included
const forwardCompleteStreetPatternSource = [
  geonimFullType + '\\s+',
  streetName,
  separators + '{1,3}',
  houseFull + '[\\s*,]',
  houseNumber,
  fullLitera,
  fullBlock + '?',
  fullApartment + '?'
]

// Complete address with geonym type in the end
const backwardCompleteStreetPatternSource = [
  streetName + '\\s+',
  geonimFullType,
  separators + '{1,3}',
  houseFull + '[\\s*,]',
  houseNumber,
  fullLitera,
  fullBlock + '?',
  fullApartment + '?'
]

// Complete address with all short parts included
const forwardCompleteStreetShortPatternSource = [
  geonimFullType + '\\s+',
  streetName,
  separators + '{1,3}',
  house + '[\\s\\.,]{1,}',
  houseNumber,
  fullLitera,
  fullBlock + '?',
  fullApartment + '?'
]

// Complete backward address with all short parts included
const backwardCompleteStreetShortPatternSource = [
  streetName + '\\s+',
  geonimFullType,
  separators + '{1,3}',
  house + '[\\s\\.]{1,}',
  houseNumber,
  fullLitera,
  fullBlock + '?',
  fullApartment + '?'
]

// Complete address with all shortened parts included
const forwardShortStreetPatternSource = [
  geonimShortType + '[\\.\\s]{1,}',
  streetName,
  separators + '{1,3}',
  house + '[\\s\\.,]{0,}',
  houseNumber,
  fullLitera,
  fullBlock + '?',
  fullApartment + '?'
]

// Complete backward address with all shortened parts included
const backwardShortStreetPatternSource = [
  streetName + '\\s+',
  geonimShortType + '[\\.\\s]{1,}',
  separators + '{1,3}',
  house + '[\\s\\.,]{1,}',
  houseNumber,
  fullLitera,
  fullBlock + '?',
  fullApartment + '?'
]

// Forward address with full geonim, short parts and without house indication
const forwardStreetNoHouseIndicationFullGeonimPatternSource = [
  geonimFullType + '\\s+',
  streetName,
  separators + '{1,3}',
  `(?:${house} + '[\\s\\.]{1,})?`,
  houseNumber,
  fullLitera,
  fullBlock + '?',
  fullApartment + '?'
]

// Backward address with full geonim, short parts and without house indication
const backwardStreetNoHouseIndicationFullGeonimPatternSource = [
  streetName + '\\s+',
  geonimFullType,
  separators + '{1,3}',
  `(?:${house}[\\s\\.,]{1,})?`,
  houseNumber,
  fullLitera,
  fullBlock + '?',
  fullApartment + '?'
]

// Forward address with short geonim, short parts and without house indication
const forwardShortStreetNoHouseIndicationFullGeonimNoAptPatternSource = [
  geonimShortType + '[\\.\\s]{1,}',
  streetName,
  separators + '{1,3}',
  `(?:${house}[\\s\\.,]{1,})?`,
  houseNumber,
  separators + '{0,2}',
  `(?:${literaNumber}[\\s\\.,]{1,})?`,
  separators + '{0,2}',
  fullBlock + '?',
  separators + '{0,3}',
  apt + '?',
  aptNumber + '?'
]

// Forward address with short geonim, short parts and without house indication
const forwardShortStreetNoHouseIndicationFullGeonimPatternSource = [
  geonimShortType + '[\\.\\s]{1,}',
  streetName,
  separators + '{1,3}',
  `(?:${house}[\\s\\.,]{1,})?`,
  houseNumber,
  fullLitera,
  fullBlock + '?',
  fullApartment + '?'
]

// Backward address with short geonim, short parts and without house indication
const backwardShortStreetNoHouseIndicationFullGeonimPatternNoAptSource = [
  streetName + '\\s+',
  geonimShortType + '[\\.\\s]{1,}',
  separators + '{1,3}',
  `(?:${house}[\\s\\.,]{1,})?`,
  houseNumber,
  separators + '{0,2}',
  `(?:${literaNumber}[\\s\\.,]{1,})?`,
  separators + '{0,2}',
  fullBlock + '?',
  apt + '?',
  aptNumber + '?'
]

// Backward address with short geonim, short parts and without house indication
const backwardShortStreetNoHouseIndicationFullGeonimPatternSource = [
  streetName + '\\s+',
  geonimShortType + '[\\.\\s]{1,}',
  separators + '{1,3}',
  `(?:${house}[\\s\\.,]{1,})?`,
  houseNumber,
  fullLitera,
  fullBlock + '?',
  fullApartment + '?'
]

const noGeonimTypeCompletePatternSource = [
  '(?<=^|[,.]\\s?)',
  streetName,
  separators + '{1,3}',
  house + '[\\s\\.,]{0,}',
  houseNumber,
  fullLitera,
  fullBlock + '?',
  fullApartment + '?',
  '(?=$|[,.])'
]

const noGeonimTypePatternNoApartmentSource = [
  '(?<=^|[,.]\\s?)',
  streetName,
  separators + '{1,3}',
  houseNumber,
  separators + '{1,3}',
  fullLitera,
  fullBlock + '?',
  apt + '?',
  aptNumber + '?',
  '(?=$|[,.])'
]

const noGeonimTypePatternSource = [
  '(?<=^|[,.]\\s?)',
  streetName,
  separators + '{1,3}',
  houseNumber,
  fullLitera,
  fullBlock + '?',
  fullApartment + '?',
  '(?=$|[,.])'
]

const forwardStreetOnlyPatternSource = [
  '(?<=^|[,.]\\s?)',
  geonim,
  separators + '{1,3}',
  streetName,
  '(?=$|[,.])'
]

const backwardStreetOnlyPatternSource = [
  '(?<=^|[,.]\\s?)',
  streetName + '\\s+',
  geonim,
  '(?=$|[,.])'
]

const forwardCompleteStreetPattern = new RegExp(forwardCompleteStreetPatternSource.join(''), 'i')
const backwardCompleteStreetPattern = new RegExp(backwardCompleteStreetPatternSource.join(''), 'i')
const forwardCompleteStreetShortPattern = new RegExp(forwardCompleteStreetShortPatternSource.join(''), 'i')
const backwardCompleteStreetShortPattern = new RegExp(backwardCompleteStreetShortPatternSource.join(''), 'i')
const forwardShortStreetPattern = new RegExp(forwardShortStreetPatternSource.join(''), 'i')
const backwardShortStreetPattern = new RegExp(backwardShortStreetPatternSource.join(''), 'i')
const forwardStreetNoHouseIndicationFullGeonimPattern = new RegExp(forwardStreetNoHouseIndicationFullGeonimPatternSource.join(''), 'i')
const backwardStreetNoHouseIndicationFullGeonimPattern = new RegExp(backwardStreetNoHouseIndicationFullGeonimPatternSource.join(''), 'i')
const forwardShortStreetNoHouseIndicationFullGeonimNoAptPattern = new RegExp(forwardShortStreetNoHouseIndicationFullGeonimNoAptPatternSource.join(''), 'i')
const backwardShortStreetNoHouseIndicationFullGeonimNoAptPattern = new RegExp(backwardShortStreetNoHouseIndicationFullGeonimPatternNoAptSource.join(''), 'i')
const forwardShortStreetNoHouseIndicationFullGeonimPattern = new RegExp(forwardShortStreetNoHouseIndicationFullGeonimPatternSource.join(''), 'i')
const backwardShortStreetNoHouseIndicationFullGeonimPattern = new RegExp(backwardShortStreetNoHouseIndicationFullGeonimPatternSource.join(''), 'i')
const noGeonimTypeCompletePattern = new RegExp(noGeonimTypeCompletePatternSource.join(''), 'i')
const noGeonimTypePatternNoApartment = new RegExp(noGeonimTypePatternNoApartmentSource.join(''), 'i')
const noGeonimTypePattern = new RegExp(noGeonimTypePatternSource.join(''), 'i')
const forwardStreetOnlyPattern = new RegExp(forwardStreetOnlyPatternSource.join(''), 'i')
const backwardStreetOnlyPattern = new RegExp(backwardStreetOnlyPatternSource.join(''), 'i')

const admin5Patterns = [
  forwardCompleteStreetPattern,
  backwardCompleteStreetPattern,
  forwardCompleteStreetShortPattern,
  backwardCompleteStreetShortPattern,
  forwardShortStreetPattern,
  backwardShortStreetPattern,
  forwardStreetNoHouseIndicationFullGeonimPattern,
  backwardStreetNoHouseIndicationFullGeonimPattern,
  forwardShortStreetNoHouseIndicationFullGeonimNoAptPattern,
  backwardShortStreetNoHouseIndicationFullGeonimNoAptPattern,
  forwardShortStreetNoHouseIndicationFullGeonimPattern,
  backwardShortStreetNoHouseIndicationFullGeonimPattern,
  noGeonimTypeCompletePattern,
  noGeonimTypePatternNoApartment,
  noGeonimTypePattern,
  forwardStreetOnlyPattern,
  backwardStreetOnlyPattern
]

const toTitleCase = (s: string) => {
  s = s.toLowerCase()
  return s.replace(/(?<=^|[^а-яєіїґ'])./g, (letter) => letter.toUpperCase())
}

const getAddress = (s: string) => {
  for (const pattern of admin5Patterns) {
    const match = s.match(pattern)
    if (match === null) continue
    if (match.groups === undefined) continue
    const data = Object.fromEntries(Object.entries(match.groups).filter(([_, data]) => data !== undefined))
    const streetTypeKey = Object.keys(data).find(el => el.indexOf('is') === 0)
    if (streetTypeKey !== undefined) {
      const streetType = streetTypes[streetTypeKey as keyof typeof streetTypes]
      data.streetName = toTitleCase(data.streetName as string)
      delete data[streetTypeKey] // eslint-disable-line
      Object.assign(data, streetType)
      return data
    }
  }
  return null
}

export default getAddress
