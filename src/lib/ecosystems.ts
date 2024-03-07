import {Ecosystems} from "@/types/Ecosystems";

export function getDappsFromEcosystems(ecosystems: Ecosystems) {
  return Object.values(ecosystems).flat().map(dapp => {
    let url: string | undefined;

    if (dapp?.data?.['@graph']) {
      //Alchemy
      const page = dapp?.data?.['@graph']?.find(d => d['@type'] === 'FAQPage');
      url = page?.mainEntity?.find(e => e['@type'] === 'OnlineBusiness')?.url;
    } else {
      url = dapp?.url || dapp?.website;
    }
    return url;
  }).filter(Boolean) as string[]
}
