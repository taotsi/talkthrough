import repositories from "./mocked_values/repositories.json"
import materials from "./mocked_values/materials.json"
import {EXPLORE_TAB} from "../components/explore/ExploreNav"

export function queryCurrentUser() {
    return {
        "name": "胡不归"
    }
}

export function queryPaperHeaders(): any[] {
    return repositories
}

export function queryMaterialHeaders(): any[] {
    return materials
}

export function queryExploreHeaders(tab: string): any[] {
    if (tab === EXPLORE_TAB.PAPERS) {
        return queryPaperHeaders()
    } else if (tab === EXPLORE_TAB.MATERIALS) {
        return queryMaterialHeaders()
    }
    return []
}

export function queryRepository(owner: string | undefined, repoName: string | undefined) {
    for (let i = 0; i < repositories.length; i++) {
        const repo = repositories[i]
        if (repo.owner === owner && repo.repository === repoName) {
            return repo
        }
    }
    return undefined
}