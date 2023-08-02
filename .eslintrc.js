module.exports = {
    extends: ["plugin:angular/johnpapa",'plugin:@typescript-eslint/recommended'],
    rules: {
        '@typescript-eslint/no-explicit-any': "off",
    },
	plugins: [
        '@typescript-eslint',
    ],
    settings: {
        angular: 16 
    }
}
