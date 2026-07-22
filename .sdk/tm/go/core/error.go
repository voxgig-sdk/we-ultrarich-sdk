package core

type WeUltrarichError struct {
	IsWeUltrarichError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewWeUltrarichError(code string, msg string, ctx *Context) *WeUltrarichError {
	return &WeUltrarichError{
		IsWeUltrarichError: true,
		Sdk:              "WeUltrarich",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *WeUltrarichError) Error() string {
	return e.Msg
}
