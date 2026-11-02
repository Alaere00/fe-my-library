export enum SelectedTab {
    reading = "Reading",
    want_to_read = "Want to read",
    completed = "Completed",
    did_not_complete = "Did not complete",
}

export const tabs = Object.entries(SelectedTab).map(([name, value]) => ({
    id: name.toLowerCase(),
    label: value,
}))