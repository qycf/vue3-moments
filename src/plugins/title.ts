export const setTitle = (title: string, description: string) => {
	if (title) {
		document.title = `${title} - ${description}`
	} else {
		document.title = import.meta.env.VITE_APP_NAME
	}
}
