---
title: Contatos
description: Envie uma menssagem
layout: default
---
<div class="container">
	<div class="col-md-8 col-md-offset-2">
		<h1 class="text-center">Contatos</h1>
		<form method="POST" role="form" id="contact_form" data-toggle="validator">
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label for="name">Nome</label>
						<input type="text" name="name" class="form-control" minlength="5" maxlength="32" required>
						<div class="help-block with-errors"></div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label for="email">Email</label>
						<input type="email" name="email" class="form-control" required>
						<div class="help-block with-errors"></div>
					</div>
				</div>
			</div>
			<div class="form-group">
				<label for="subject">Assunto</label>
				<input type="text" name="subject" class="form-control" minlength="10" maxlength="255" required>
				<div class="help-block with-errors"></div>
			</div>
			<div class="form-group">
				<label for="message">Menssagem</label>
				<textarea name="message" class="form-control" rows="5" minlength="20" maxlength="2048" required></textarea>
				<div class="help-block with-errors"></div>
			</div>
			<div class="alert" style="display: none;"></div>
			<div class="form-group">
				<button type="submit" class="btn btn-primary">Enviar</button>
			</div>
		</form>
	</div>
</div>
