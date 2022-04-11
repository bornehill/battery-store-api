class Response {
	constructor(statusCode, message, data, ok) {
		this.statusCode = statusCode;
		this.message = message;
		this.data = data;
		this.ok = ok;
	}
}

export const StatusCode = {
	OK: 200,
	CREATED: 201,
	ACCEPTED: 202,
	NO_CONTENT: 204,
	MOVED: 301,
	NOT_MODIFIED: 304,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	UNSUPPORTED_MEDIA_TYPE: 415,
	INTERNAL_SERVER_ERROR: 500,
	NOT_IMPLEMENTED: 501,
};

export default class ApiResponse {
	/**
	 * Creates a response with an OK (200) status.
	 * @param {Response} res Response object.
	 * @param {object} data Object returned with the response.
	 * @param {string} message Message retrieved to the client.
	 */
	static Ok(res, data = null, message = "") {
		res
			.status(StatusCode.OK)
			.send(new Response(StatusCode.OK, message, data, true));
	}

	/**
	 * Creates a response with a Created (201) status.
	 * @param {Response} res Response object.
	 * @param {object} data Object returned with the response.
	 * @param {string} message Message retrieved to the client.
	 */
	static Created(res, data = null, message = "") {
		res
			.status(StatusCode.CREATED)
			.send(new Response(StatusCode.CREATED, message, data, true));
	}

	/**
	 * Creates a response with an Accepted (202) status.
	 * @param {Response} res Response object.
	 * @param {string} message Message retrieved to the client.
	 * @param {object} data Object returned with the response.
	 */
	static Accepted(res, message = "", data = null) {
		res
			.status(StatusCode.ACCEPTED)
			.send(new Response(StatusCode.ACCEPTED, message, data, true));
	}

	/**
	 * Creates a response with a No Content (204) status.
	 * @param {Response} res Response object.
	 * @param {string} message Message retrieved to the client.
	 * @param {object} data Object returned with the response.
	 */
	static NoContent(res, message = "", data = null) {
		res
			.status(StatusCode.NO_CONTENT)
			.send(new Response(StatusCode.NO_CONTENT, message, data, false));
	}

	/**
	 * Creates a response with a Moved Permanently (301) status.
	 * @param {Response} res Response object.
	 * @param {string} message Message retrieved to the client.
	 * @param {object} data Object returned with the response.
	 */
	static Moved(res, message = "", data = null) {
		res
			.status(StatusCode.MOVED)
			.send(new Response(StatusCode.MOVED, message, data, false));
	}

	/**
	 * Creates a response with a Not Modified (304) status.
	 * @param {Response} res Response object.
	 * @param {string} message Message retrieved to the client.
	 * @param {object} data Object returned with the response.
	 */
	static NotModified(res, message = "", data = null) {
		res
			.status(StatusCode.NOT_MODIFIED)
			.send(new Response(StatusCode.NOT_MODIFIED, message, data, false));
	}

	/**
	 * Creates a response with a Bad Request (400) status.
	 * @param {Response} res Response object.
	 * @param {string} message Message retrieved to the client.
	 * @param {object} data Object returned with the response.
	 */
	static BadRequest(res, message = "", data = null) {
		res
			.status(StatusCode.BAD_REQUEST)
			.send(new Response(StatusCode.BAD_REQUEST, message, data, false));
	}

	/**
	 * Creates a response with an Unauthorized (401) status.
	 * @param {Response} res Response object.
	 * @param {string} message Message retrieved to the client.
	 * @param {object} data Object returned with the response.
	 */
	static Unauthorized(res, message = "", data = null) {
		res
			.status(StatusCode.UNAUTHORIZED)
			.send(new Response(StatusCode.UNAUTHORIZED, message, data, false));
	}

	/**
	 * Creates a response with a Forbidden (403) status.
	 * @param {Response} res Response object.
	 * @param {string} message Message retrieved to the client.
	 * @param {object} data Object returned with the response.
	 */
	static Forbidden(res, message = "", data = null) {
		res
			.status(StatusCode.FORBIDDEN)
			.send(new Response(StatusCode.FORBIDDEN, message, data, false));
	}

	/**
	 * Creates a response with a Not Found (404) status.
	 * @param {Response} res Response object.
	 * @param {string} message Message retrieved to the client.
	 * @param {object} data Object returned with the response.
	 */
	static NotFound(res, message = "", data = null) {
		return res
			.status(StatusCode.NOT_FOUND)
			.send(new Response(StatusCode.NOT_FOUND, message, data, false));
	}

	/**
	 * Creates a response with an Unsupported Media Type (415) status.
	 * @param {Response} res Response object.
	 * @param {string} message Message retrieved to the client.
	 * @param {object} data Object returned with the response.
	 */
	static UnsupportedMediaType(res, message = "", data = null) {
		return res
			.status(StatusCode.UNSUPPORTED_MEDIA_TYPE)
			.send(
				new Response(StatusCode.UNSUPPORTED_MEDIA_TYPE, message, data, false)
			);
	}

	/**
	 * Creates a response with an Internal Server Error (500) status.
	 * @param {Response} res Response object.
	 * @param {string} message Message retrieved to the client.
	 * @param {object} data Object returned with the response.
	 */
	static InternalServerError(res, message = "", data = null) {
		return res
			.status(StatusCode.INTERNAL_SERVER_ERROR)
			.send(
				new Response(StatusCode.INTERNAL_SERVER_ERROR, message, data, false)
			);
	}

	/**
	 * Creates a response with a Not Implemented (501) status.
	 * @param {Response} res Response object.
	 * @param {string} message Message retrieved to the client.
	 * @param {object} data Object returned with the response.
	 */
	static NotImplemented(res, message, data) {
		return res
			.status(StatusCode.NOT_IMPLEMENTED)
			.send(
				new Response(StatusCode.NOT_IMPLEMENTED, message, data || null, false)
			);
	}
}
